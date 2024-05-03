import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyMessageType, AlertifyService } from 'src/app/services/admin/alertify.service';
import { CustomHttpClientService } from 'src/app/services/common/custom-http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { SpinnerType } from 'src/app/services/common/toastr/toastr.component';
declare var $: any
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef,
    private _renderer: Renderer2,
    private httpClient: CustomHttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService: AlertifyService
  ) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "/assets/delete.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callBack: EventEmitter<any> = new EventEmitter();
  @HostListener("click")
  async onclick() {
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.BallAtom);
      const td: HTMLTableCellElement = this.element.nativeElement;
      this.httpClient.delete({
        controller: this.controller
      }, this.id).subscribe(data=>{
        $(td.parentElement).animate({
          opacity: 0,
          left: "+=50",
          height: "toogle",
        }, 700, ()=>{
          this.callBack.emit();
          this.alertifyService.message("Ürün başarıyla silinmiştir.", {
            messageType: AlertifyMessageType.Success
          });
        })
      }, error =>{
        this.spinner.hide(SpinnerType.BallAtom);
        this.alertifyService.message("Silme işlemi sırasında hatayla karşılaşıldı.", {
          messageType: AlertifyMessageType.Error
        });
      });
    });

  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: "250px",
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }
}
