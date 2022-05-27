import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IPDService } from '@app/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ExcelService } from '@app/shared/excel.service';

@Component({
  selector: 'app-ipd',
  templateUrl: './ipd.component.html',
  styleUrls: ['./ipd.component.scss']
})
export class IpdComponent implements OnInit {

  public columnDefs: ColDef[] = [
    { headerName: 'วัน Admit', field: 'regdate', sortable: true, filter: true, resizable: true, minWidth: 50, flex: 1, floatingFilter: true },
    { headerName: 'เวลา Admit', field: 'regtime', sortable: true, filter: true, resizable: true, minWidth: 50, flex: 1, floatingFilter: true },
    { headerName: 'an', field: 'an', sortable: true, filter: true, resizable: true, minWidth: 80, flex: 1, floatingFilter: true },
    { headerName: 'hn', field: 'hn', sortable: true, filter: true, resizable: true, minWidth: 50, flex: 1, floatingFilter: true },
    { headerName: 'ชื่อ-นามสกุล', field: 'fullname', sortable: true, filter: true, resizable: true, minWidth: 270, flex: 1, floatingFilter: true },
    { headerName: 'วัน dch', field: 'dchdate', sortable: true, filter: true, resizable: true, minWidth: 50, flex: 1, floatingFilter: true },
    { headerName: 'เวลา dch', field: 'dchtime', sortable: true, filter: true, resizable: true, minWidth: 50, flex: 1, floatingFilter: true },
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
    private ipdService: IPDService,
    private route: Router,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    try {
      let rs: any = await this.ipdService.getIPD();
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
    this.route.navigate(['/ipd/'+selectedRows[0].an+'/detail']);
  }



  excel() {
    if (this.rowData.length > 0) {
      this.excelService.exportAsExcelFile(this.rowData, 'ipd');
    }
  }

}
