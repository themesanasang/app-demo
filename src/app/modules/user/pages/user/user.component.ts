import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@app/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Observable, window } from 'rxjs';
import { ExcelService } from '@app/shared/excel.service';

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public columnDefs: ColDef[] = [
    { headerName: 'ลำดับ', field: 'id', sortable: true, filter: true, resizable: true, minWidth: 100, flex: 1, floatingFilter: true },
    { headerName: 'username', field: 'username', sortable: true, filter: true, resizable: true, minWidth: 100, flex: 1, floatingFilter: true },
    { headerName: 'ชื่อ-นามสกุล', field: 'fullname', sortable: true, filter: true, resizable: true, minWidth: 270, flex: 1, floatingFilter: true },
    { headerName: 'วันที่สร้าง', field: 'created', sortable: true, filter: true, resizable: true, minWidth: 100, flex: 1, floatingFilter: true },
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  private gridApi!: GridApi;
  public rowSelection = 'single';
  rowData = [];

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  
  constructor(
    private userService: UserService,
    private route: Router,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }


  async loadData() {
    try {
      let rs: any = await this.userService.getUser();
      if (rs.ok) {
        this.rowData = rs.result;
      }
    } catch (error) {
      
    }
  }

   /**
   * grid load
  */
    onGridReady(params: GridReadyEvent) {
      this.gridApi = params.api;
    }

    
  /**
   * grid row selected
   */
  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows(); 
    //console.log(selectedRows[0].id);
    this.route.navigate(['/user/'+selectedRows[0].id+'/detail']);
  }



  excel() {
    if (this.rowData.length > 0) {
      this.excelService.exportAsExcelFile(this.rowData, 'user');
    }
  }


}
