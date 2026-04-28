import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../categoryService';
import { Category } from '../model/category';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-edit',
  imports: [FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule ],
  templateUrl: './category-edit.html',
  styleUrl: './category-edit.scss',
})

export class CategoryEditComponent implements OnInit {
    category: Category;

    constructor(
        public dialogRef: MatDialogRef<CategoryEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {category : Category},
        private categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        this.category = this.data.category ? Object.assign({}, this.data.category) : new Category();
    }

    onSave() {
        this.categoryService.saveCategory(this.category).subscribe(() => {
            this.dialogRef.close();
        });
    }

    onClose() {
        this.dialogRef.close();
    }
}
