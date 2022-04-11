import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized, ActivatedRoute } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { MetaData } from 'ng-event-bus/lib/meta-data';
import { Observable } from 'rxjs';
import { User } from './core/user/user';
import { UserService } from './core/user/user.service';
import { ProfileService } from './images/profile.service';

@Component(
  {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
  }
)

export class AppComponent implements OnInit
{

  isCollapsed = false;  

  @ViewChild('menuHome') private menuHome!: ElementRef;
  @ViewChild('menuIdi') private meuIdi!: ElementRef;
  @ViewChild('menuCert') private meuCert!: ElementRef;
  @ViewChild('menuForm') private meuForm!: ElementRef;
  @ViewChild('menuProf') private meuProf!: ElementRef;
  @ViewChild('menuProj') private meuProj!: ElementRef;
  @ViewChild('menuLin') private meuLin!: ElementRef;

  user$: Observable<User>;
  user!: User;
  userNv: boolean;
  profileImg:any
  img64:any
  nome:string

  logged!: boolean;
  
  constructor(
    router:Router, 
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private eventBus: NgEventBus,
  )   
  {
    this.user$ = userService.getUser();
    this.user$.subscribe(user => 
      {
        this.user = user      
        if (user)
        {
          this.userNv = user.nv === 'admin'

          this.profileService.getImgByUserId(user.id, 'perfil').subscribe(imh =>
            {
              if (imh.dado === 'vazio')
              {
                this.profileImg = '../../assets/icons/profile.png'
              } else {
                this.img64 = imh
                this.profileImg = 'data:image/jpeg;base64,' + this.img64
              }
            }
          );

          this.nome = user.name.split(' ')[0]

          this.eventBus.on('perfil').subscribe((meta: MetaData) => 
          {
            if (meta.data == 'success') {
              this.profileService.getImgByUserId(user.id, 'perfil').subscribe(imh =>
                {
                  this.img64 = imh
                  this.profileImg = 'data:image/jpeg;base64,' + this.img64                   
                }
              )
            }
          });
        }
      }
    )
    if (this.user != null)
    {
      this.logged = true;
    }    

    router.events.forEach((event) => 
    {
      if(event instanceof NavigationEnd) 
      {
        if(router.url === '/main')
        {
          this.menuHome.nativeElement.classList.add('ant-menu-item');
          this.menuHome.nativeElement.classList.add('ant-menu-item-selected');
        } 
        
        else if(router.url === '/proficiencias')
        {          
          this.meuProf.nativeElement.classList.add('ant-menu-item');
          this.meuProf.nativeElement.classList.add('ant-menu-item-selected');
        }

        else if(router.url === '/idiomas')
        {
          this.meuIdi.nativeElement.classList.add('ant-menu-item');
          this.meuIdi.nativeElement.classList.add('ant-menu-item-selected');
        } 
        
        else if (this.menuHome && this.menuHome.nativeElement)
        {
          this.menuHome.nativeElement.classList.remove('ant-menu-item-selected');
        }
      }
    });    

    if (!this.user)
    {
      this.logged = false;
      router.navigate(['/home']);
    }
  }
  
  ngOnInit():void
  {  
    if (this.user != null)
    {
      this.userNv = (this.user.nv == "admin");
    }      
  }
}
