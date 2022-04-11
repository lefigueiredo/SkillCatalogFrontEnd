import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { Observable } from 'rxjs';
import { User } from '../core/user/user';
import { UserService } from '../core/user/user.service';
import { ProfileService } from './profile.service';

@Component(
    {
        selector: 'sc-profile',
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.css']
    }
)

export class ProfileComponent implements OnInit
{
    imgChangeEvt: any = '';
    cropImgPreview: any = '';
    capaButton: boolean;

    imgChangeEvtProf: any = '';
    cropImgPreviewProf: any = '';
    profButton: boolean;

    user$: Observable<User>;
    user!: User;
    
    constructor(
        private userService: UserService,
        private profileService: ProfileService,
        private notification: NzNotificationService,
        private activatedRoute: ActivatedRoute,
    )
    { 
        this.user$ = userService.getUser();
        this.user$.subscribe(user => this.user = user)
    }

    ngOnInit(): void
    {
        this.capaButton = true;

        if (this.activatedRoute.snapshot.data.capa['dado'] === 'vazio')
        {
            this.cropImgPreview = '../../assets/teste.png'
        }
        
        else
        {
            this.cropImgPreview = 'data:image/jpeg;base64,' + this.activatedRoute.snapshot.data.capa
        }
    }

    onFileChange(event: any): void 
    {
        this.imgChangeEvt = event;
        this.capaButton = false;

        this.imgChangeEvtProf = event;
        this.profButton = false;
    }

    cropImg(e: ImageCroppedEvent) 
    {
        this.cropImgPreview = e.base64;

        this.cropImgPreviewProf = e.base64;
    }

    imgLoad() {
        // display cropper tool
    }

    initCropper() {
        // init cropper
    }
    
    imgFailed() {
        // error msg
    }

    clicando()
    {
        var croppedImg64 = this.cropImgPreview
        var base64 = {base: croppedImg64.replace('data:image/jpeg;base64,', '')}
        
        this.profileService.sendImg(base64, this.user.id, 'capa').subscribe(
            (data) => 
            {
            this.notification.success( // msg de sucesso
                'Upload feito com sucesso!!',
                '',
                { nzPlacement: 'bottomRight' }
            )

            },
            err => 
            {
            this.notification.warning( // msg de erro
                'Selecione uma Imagem para fazer Upload!!',
                '',
                { nzPlacement: 'bottomRight' })
            }
        )

        this.imgChangeEvt = null
        this.capaButton = true;
    }    
}