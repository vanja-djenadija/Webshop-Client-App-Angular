import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {Product, ProductStatus} from 'src/app/model/product.model';
import {User} from 'src/app/model/user.model';
import {ProductService} from 'src/app/services/product.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from "../../model/category.model";
import {CategoryService} from 'src/app/services/category.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatSidenav} from "@angular/material/sidenav";
import {SearchProduct} from "../../model/search-product.model";
import {ProductAttribute} from "../../model/product-attribute.model";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements AfterViewInit {
  @ViewChild('sidenav', {static: true}) sidenav!: MatSidenav;
  productName: string = '';
  products: Product[] = [];
  locations: string[] = [];
  categories: Category[] = [];
  currentProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    isNew: false,
    status: ProductStatus.ACTIVE,
    location: '',
    createDate: new Date(),
    quantity: 0,
    attributes: [],
    comments: [],
    images: [],
    seller: new User(0, '', '', '', '', '', '', '', ''),
    customer: new User(0, '', '', '', '', '', '', '', '')
  };

  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 50];

  pppControl = new FormControl(this.pageSizes[0].valueOf);
  treeControl = new NestedTreeControl<Category>(category => category.subcategories);
  dataSource = new MatTreeNestedDataSource<Category>();
  hasChild = (_: number, node: Category) => !!node.subcategories && node.subcategories.length > 0;
  filterApplied: boolean = false;
  selectedCategory: Category | null = null;
  generalFilterForm: FormGroup;
  specificFilterForm: FormGroup;

  constructor(private productService: ProductService, private categoryService: CategoryService, private snackBar: MatSnackBar,
              private formBuilder: FormBuilder) {
    this.generalFilterForm = this.formBuilder.group({
      location: [''],
      priceFrom: [''],
      priceTo: ['']
    });
    this.specificFilterForm = this.formBuilder.group({});
    this.retrieveProducts();
    this.retrieveCategories();
  }

  ngAfterViewInit() {

  }

  getRequestParams(productName: string, page: number, pageSize: number): any {
    let params: any = {};

    if (productName) {
      params[`productName`] = productName;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  private retrieveCategories() {
    this.categoryService.getAll().subscribe({
      next: (data: any) => {
        this.categories = data;
        this.dataSource.data = this.categories;
        console.log(this.categories);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  retrieveProducts(): void {
    const params = this.getRequestParams(this.productName, this.page, this.pageSize);
    this.productService.getAllActiveProducts(params).subscribe({
      next: (data) => {
        this.products = data.content;
        this.count = data.totalElements;
        this.locations = Array.from(new Set(this.products.map((product) => product.location)));
        this.filterApplied = false;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  handlePageChange(event: number): void {
    this.page = event;
    // TODO: Not retrieve products, check if category selected
    if (this.selectedCategory != null)
      this.filterByCategory(this.selectedCategory);
    else
      this.retrieveProducts();
  }

  // TODO:
  handlePageSizeChange(value: number): void {
    this.pageSize = value;
    this.page = 1;
    if (this.selectedCategory != null)
      this.filterByCategory(this.selectedCategory);
    else
      this.retrieveProducts();
  }

  searchProductName(): void {
    this.page = 1;
    this.retrieveProducts();
  }

  setActiveProduct(product: Product, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  deleteFilters() {
    this.sidenav.close().then(() => {
      this.selectedCategory = null;
      this.retrieveProducts();
      this.snackBar.open('Filters removed.', undefined, {duration: 2000});
    });
  }

  filterByCategory(category: Category) {
    const params = this.getRequestParams('', this.page, this.pageSize); // TODO: Include productName
    this.selectedCategory = category;
    this.initSpecificFilterForm();
    this.productService.getProductsByCategory(category.name, params).subscribe({
      next: (data) => {
        this.products = data.content;
        this.count = data.totalElements;
        this.filterApplied = true;
        console.log(this.products);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        if (this.products.length == 0)
          this.snackBar.open('No products with category: ' + category.name, undefined, {duration: 2000});
        else
          this.snackBar.open('Products with category: ' + category.name, undefined, {duration: 2000});
      }
    });
  }

  initSpecificFilterForm() {
    this.selectedCategory!.attributes.forEach(attribute => {
      this.specificFilterForm.addControl(String(attribute.id), new FormControl(''));
    });
  }

  search() {
    const params = this.getRequestParams('', this.page, this.pageSize);
    const productAttributes = this.getProductAttributes();
    console.log('Product attributes', productAttributes);
    const searchProduct: SearchProduct = {
      categoryName: this.selectedCategory!.name,
      location: this.generalFilterForm.value.location,
      categoryAttributes: productAttributes,
      priceFrom: this.generalFilterForm.value.priceFrom,
      priceTo: this.generalFilterForm.value.priceTo
    };

    this.productService.search(searchProduct, params).subscribe({
      next: (data) => {
        console.log('Search ', data.content);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private getProductAttributes(): ProductAttribute[] {
    let productAttributes: ProductAttribute[] = [];
    for (let attribute of this.selectedCategory!.attributes) {
      let formAttrId: string = String(attribute.id);
      let value = this.specificFilterForm.get(formAttrId)!.value;
      if (value.length !== 0) {
        productAttributes.push(new ProductAttribute(attribute, value));
      }
    }
    return productAttributes;
  }
}
