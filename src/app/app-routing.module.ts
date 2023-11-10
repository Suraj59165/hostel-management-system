import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHostelDataComponent } from './components/add-hostel-data/add-hostel-data.component';

const routes: Routes = [
    {
        path: 'edit', component: AddHostelDataComponent
    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
