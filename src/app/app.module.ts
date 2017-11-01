import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpModule} from '@angular/http';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
// import { HttpSwProxyModule } from 'ng-http-sw-proxy';
import {PokemonsService} from './services/pokemons.service';
import {ABSDispatcherService} from './services/a-b-s-dispatcher.service';
import {ABSSynchroniserService} from './services/a-b-s-synchroniser.service';
// import {PouchdbService} from './services/pouchdb.service';
import {UsersService} from './services/users.service';
import {NetworkCheckStatusService} from './services/network-check-status.service';
import {CacheStorageService} from './services/cache-storage.service';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatGridListModule,
  MatCardModule,
  MatIconModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatInputModule,
  MatListModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatChipsModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatDialogModule,
} from '@angular/material';
import {AppComponent} from './app.component';
import { ShadowCardDirective } from './directives/shadow-card.directive';
import { PokemonTypeColorPipePipe } from './pipes/pokemon-type-color-pipe.pipe';
import { ListPokemonComponent } from './components/list-pokemon/list-pokemon.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { DetailPokemonComponent } from './components/detail-pokemon/detail-pokemon.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component';
import { InMemoryDataService }  from './services/in-memory-data.service';
import { DndDirective } from './directives/dnd.directive';
import { DndComponent } from './components/dnd/dnd.component';
import { PokemonSearchComponent } from './components/pokemon-search/pokemon-search.component';
import { PokemonFilterComponent } from './components/pokemon-filter/pokemon-filter.component';
import { LoginComponent } from './components/login/login.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { PokemonAddComponent, DialogContentExampleDialog} from './components/pokemon-add/pokemon-add.component';


const appRoutes: Routes = [
  {	path: 'pokemon',
    canActivate: [AuthGuard],
    children: [
      { path: 'all', component: ListPokemonComponent },
      { path: 'edit/:id', component: PokemonFormComponent },
      { path: ':id', component: DetailPokemonComponent }
    ]
  },
  { path: '', redirectTo: 'pokemon/all', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ShadowCardDirective,
    PokemonTypeColorPipePipe,
    ListPokemonComponent,
    DetailPokemonComponent,
    PageNotFoundComponent,
    PokemonFormComponent,
    DndDirective,
    DndComponent,
    PokemonSearchComponent,
    PokemonFilterComponent,
    LoginComponent,
    AddUserComponent,
    PokemonAddComponent,
    DialogContentExampleDialog,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    // HttpSwProxyModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    // RouterModule.forChild([{ path: 'login', component: LoginComponent }]),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    FormsModule,
    MatTooltipModule,
    BrowserModule,
    MatDialogModule,
  ],
  providers: [
    PokemonsService,
    CacheStorageService,
    UsersService,
    AuthGuard,
    AuthService,
    NetworkCheckStatusService,
    ABSDispatcherService,
    ABSSynchroniserService,
  ],
  exports: [
    MatButtonModule,
    NoopAnimationsModule,
    RouterModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    FormsModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatDialogModule,
    DialogContentExampleDialog,
  ],
  entryComponents: [DialogContentExampleDialog],
  bootstrap: [AppComponent]
})
export class AppModule {
}
