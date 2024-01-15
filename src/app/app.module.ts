import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskListComponent } from './task_module/task-list/task-list.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from './task_module/task/task.component';
import { NewTaskComponent } from './task_module/new-task/new-task.component';
import { EffectsModule } from '@ngrx/effects';

import { taskReducer } from './state/task.reducer';
import { TaskEffects } from './state/task.effects';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { UtilityService } from './services/util.service';
import { LoaderComponent } from './helper/loader/loader.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, LoaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ tasks: taskReducer }),
    EffectsModule.forRoot([TaskEffects]),
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [
    AuthGuard,
    { provide: 'AuthGuard', useClass: AuthGuard },
    UtilityService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
