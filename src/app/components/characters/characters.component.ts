import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CharactersService } from 'src/app/services/characters.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, AfterViewInit  {
  characters: MatTableDataSource<any>;
  charactersInfo: {
    count :number,
    next :string | null,
    pages : number,
    prev : string | null
  } | null = null;

  displayedColumns: string[] = ['id', 'name', 'species', 'status', 'origin'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private charactersService:CharactersService
  ) { }

  ngOnInit(): void {
    this.charactersService.getAll()
    .subscribe(characters=>{
      this.charactersInfo = characters.info
      // this.characters = characters.results
      console.log(characters.info)
      console.log(characters.results)
      this.characters = new MatTableDataSource(characters.results);
      this.characters.paginator = this.paginator;
      this.characters.sort = this.sort;
    })
  }

  ngAfterViewInit() {
    // this.characters.paginator = this.paginator;
    // this.characters.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.characters.filter = filterValue.trim().toLowerCase();

    if (this.characters.paginator) {
      this.characters.paginator.firstPage();
    }
  }

}
