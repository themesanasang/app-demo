import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '@app/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ExcelService } from '@app/shared/excel.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  public columnDefs: ColDef[] = [
    { headerName: 'hn', field: 'hn', sortable: true, filter: true, resizable: true, minWidth: 80, flex: 1, floatingFilter: true },
    { headerName: 'cid', field: 'cid', sortable: true, filter: true, resizable: true, minWidth: 100, flex: 1, floatingFilter: true },
    { headerName: 'ชื่อ-นามสกุล', field: 'fullname', sortable: true, filter: true, resizable: true, minWidth: 270, flex: 1, floatingFilter: true },
    {
      headerName: 'เพศ', field: 'sex', sortable: true, filter: true, resizable: true, minWidth: 80, flex: 1, floatingFilter: true 
      ,cellRenderer: (params: any) => {
        if (params.value == 1) {
          return 'ชาย'
        } else {
          return 'หญิง'
        }
       
      }
    }, 
    { headerName: 'วันที่สร้าง', field: 'created', sortable: true, filter: true, resizable: true, minWidth: 80, flex: 1, floatingFilter: true },
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
    private patientService: PatientService,
    private route: Router,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }


  async loadData() {
    try {
      let rs: any = await this.patientService.getPatient();
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
    this.route.navigate(['/patient/'+selectedRows[0].hn+'/detail']);
  }



  excel() {
    if (this.rowData.length > 0) {
      this.excelService.exportAsExcelFile(this.rowData, 'patient');
    }
  }

}
