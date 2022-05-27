import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OPDService } from '@app/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ExcelService } from '@app/shared/excel.service';

@Component({
  selector: 'app-opd',
  templateUrl: './opd.component.html',
  styleUrls: ['./opd.component.scss']
})
export class OpdComponent implements OnInit {

  public columnDefs: ColDef[] = [
    { headerName: 'vstdate', field: 'vstdate', sortable: true, filter: true, resizable: true, minWidth: 50, flex: 1, floatingFilter: true },
    { headerName: 'vsttime', field: 'vsttime', sortable: true, filter: true, resizable: true, minWidth: 50, flex: 1, floatingFilter: true },
    { headerName: 'vn', field: 'vn', sortable: true, filter: true, resizable: true, minWidth: 80, flex: 1, floatingFilter: true },
    { headerName: 'hn', field: 'hn', sortable: true, filter: true, resizable: true, minWidth: 50, flex: 1, floatingFilter: true },
    { headerName: 'ชื่อ-นามสกุล', field: 'fullname', sortable: true, filter: true, resizable: true, minWidth: 270, flex: 1, floatingFilter: true },
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
    private opdService: OPDService,
    private route: Router,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    try {
      let rs: any = await this.opdService.getOPD();
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
    this.route.navigate(['/opd/'+selectedRows[0].vn+'/detail']);
  }



  excel() {
    if (this.rowData.length > 0) {
      this.excelService.exportAsExcelFile(this.rowData, 'opd');
    }
  }

}
