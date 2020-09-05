import { Component, OnInit } from '@angular/core';
import { NewsModel } from '../../common/models/news.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewsService } from '../../common/services/news-service';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
})
export class NewsFormComponent implements OnInit {

  constructor(private newsService: NewsService) {
    this.resultMessage='';
  }

  /**
   * error message
   */
  resultMessage: string;

  newsForm: FormGroup;
  newsModel: NewsModel;

  ngOnInit(): void {
    this.setForm();
  }

  /**
   * get input value
   */
  get title() {
    return this.newsForm.get('title');
  }

  /**
   * get input value
   */
  get content() {
    return this.newsForm.get('content');
  }

  /**
   * get input value
   */
  get image() {
    return this.newsForm.get('image');
  }

  /**
   * Initialize Form and all validations for input
   */
  private setForm() {
    this.newsForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
    this.newsForm.reset();
  }

  /**
   * Validate if the information completed is valid and save it in the model
   */
  public submit() {
    if (this.newsForm.valid) {
      this.newsModel = {
        title: this.newsForm.value.title,
        content: this.newsForm.value.content,
        images: this.newsForm.value.image,
        creationDate: new Date(),
        users_id: Number(localStorage.getItem('userId'))
      };
      this.sendUser(this.newsModel);
    }
  }

  private sendUser(news: NewsModel) {
    this.newsService.addNew(news).subscribe(
      (response) => {
        if(response){
          this.resultMessage = 'Post Creado con éxito';
        }else{
          this.resultMessage = 'Error al crear el post';
        }
      },
      (error) => {
        this.resultMessage = 'Error al crear el post';
      }
    );
  }

}
