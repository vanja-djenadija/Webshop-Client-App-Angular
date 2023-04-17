import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Attribute} from "../../model/attribute.model";
import {Image} from "../../model/image.model";
import {Category} from "../../model/category.model";
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {CategoryService} from "../../services/category.service";
import {ProductService} from "../../services/product.service";
import {ProductRequest} from "../../model/product-request.model";
import {TokenStorageService} from "../../auth/services/token-storage.service";
import {Product} from "../../model/product.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {FileUploadService} from "../../services/file-upload.service";
import {ProductAttribute} from "../../model/product-attribute.model";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class AddProductComponent implements OnInit {
  generalInfoForm: FormGroup; // first step
  categoriesForm: FormGroup; // second step
  attributesForm: FormGroup; // third step
  categories: Category[] = [];
  attributes: Attribute[] = [];
  selectedCategories: Category[] = [];
  selectedImages: FileList | undefined;
  firebaseImagesURL: string[] = [];
  isNew = true;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService,
              private productService: ProductService, private tokenService: TokenStorageService,
              private uploadService: FileUploadService,
              private snackBar: MatSnackBar, private router: Router,
              public dialogRef: MatDialogRef<AddProductComponent>) {
    this.generalInfoForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      location: ['', Validators.required]
    });
    this.categoriesForm = this.formBuilder.group({});
    this.attributesForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.retrieveCategories();
  }

  retrieveCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        console.log(this.categories);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  selectImages(event: any) {
    this.selectedImages = event.target.files;
    console.log(this.isNew);
    this.uploadImages();
  }

  uploadImages() {
    for (let i = 0; i < this.selectedImages!.length; i++) {
      this.upload(this.selectedImages![i]);
    }
    console.log('All files uploaded.');
  }

  upload(file: File) {
    this.uploadService.uploadFile(file).subscribe({
      next: (downloadURL: any) => {
        console.log('File uploaded successfully! Download URL:', downloadURL);
        this.firebaseImagesURL.push(downloadURL);
      },
      error: (error: any) => {
        console.error('Error uploading file:', error);
      }
    });
  }

  setCategory(index: number) {
    const clickedCategory = this.categories[index];
    if (clickedCategory.name != "Other") {
      this.selectedCategories.push(clickedCategory);
      this.categories = clickedCategory.subcategories;
      if (clickedCategory.subcategories.length > 0)
        this.categories.push(new Category(0, 'Other', [], []));
    }
  }

  // TODO: Add product
  addProduct() {
    const product: ProductRequest = {
      name: this.generalInfoForm.value.name,
      description: this.generalInfoForm.value.description,
      price: this.generalInfoForm.value.price,
      isNew: this.isNew,
      location: this.generalInfoForm.value.location,
      createDate: new Date(),
      quantity: 1,
      attributes: this.getProductAttributes(),
      images: this.firebaseImagesURL.map((url) => new Image(0, url)),
      sellerId: this.tokenService.getUser().id,
      categories: this.selectedCategories
    }

    this.productService.addProduct(product).subscribe({
      next: (product: Product) => {
        console.log("Product added.", product);
      },
      error: (err: any) => {
        console.log(err);
        this.snackBar.open('An error occurred.', undefined, {duration: 2000});
      },
      complete: () => {
        this.snackBar.open('Product added successfully.', undefined, {duration: 2000});
        this.dialogRef.close();
        this.router.navigateByUrl('/').then(() => {
        });
      }
    });
  }

  initAttributes() {
    for (let category of this.selectedCategories) {
      for (let attribute of category.attributes) {
        // @ts-ignore
        this.attributes.push(attribute);
      }
    }
    console.log(this.attributes);
    this.attributes.forEach(attribute => {
      this.attributesForm.addControl(String(attribute.id), new FormControl('', Validators.required));
    });
  }

  private getProductAttributes(): ProductAttribute[] {
    let productAttributes: ProductAttribute[] = [];
    for (let attribute of this.attributes) {
      let formAttrId: string = String(attribute.id);
      // @ts-ignore
      let value = this.attributesForm.get(formAttrId).value;
      productAttributes.push(new ProductAttribute(attribute, value));
    }
    return productAttributes;
  }
}
