import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CursosGuard } from './guards/cursos.guard';
import { NgModule } from '@angular/core';

//import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
//import { ModuleWithProviders } from '@angular/compiler/src/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AlunossGuard } from './guards/alunos.guard';
//import { CursosComponent } from './cursos/cursos.component';
//import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';

const appRoutes: Routes = [
    {path: 'cursos', 
        loadChildren: '../app/cursos/cursos.module#CursosModule',
        canActivate: [AuthGuard],
        canActivateChild: [CursosGuard],
        canLoad: [AuthGuard]
    },
    {path: 'alunos', 
        loadChildren: '../app/alunos/alunos.module#AlunosModule',
        canActivate: [AuthGuard],
        //canActivateChild: [AlunossGuard]
        canLoad: [AuthGuard]
    },
    {path: 'login', component: LoginComponent},
    //{ path: 'cursos', component: CursosComponent },
    //{ path: 'curso/:id', component: CursoDetalheComponent },
    //{ path: 'naoEncontrado', component: CursoNaoEncontradoComponent },
    { path: 'home', component: HomeComponent,
        canActivate: [AuthGuard]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent,  } //canActivate: [AuthGuard]
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash : true})],
    exports: [RouterModule]
})
export class AppRoutingModule {}