// company.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';
import * as jsonData from '../../data.json';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  companyPosts: Post[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  companyName: string | null = null;

  // JSON fayldan ma'lumot olish
  data: Post[] = (jsonData as any).default || [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.companyName = this.route.snapshot.paramMap.get('company');
    this.loadCompanyPosts();
  }

loadCompanyPosts(): void {
  try {
    console.log('Kompaniya nomi:', this.companyName);
    console.log('Barcha postlar:', this.data);
    if (this.companyName) {
      this.companyPosts = this.data.filter(post => {
        console.log('Post kompaniyasi:', post.company);
        return post.company?.toLowerCase() === this.companyName?.toLowerCase();
      });
      console.log('Filtrlangan postlar:', this.companyPosts);
      this.isLoading = false;
    } else {
      throw new Error('URLda kompaniya nomi topilmadi');
    }
  } catch (err) {
    console.error('Kompaniya postlarini yuklashda xato:', err);
    this.errorMessage = 'Kompaniya yangiliklarini yuklashda xato yuz berdi';
    this.isLoading = false;
  }
}
}