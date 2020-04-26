import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medicinelist',
  templateUrl: './medicinelist.component.html',
  styleUrls: ['./medicinelist.component.css']
})
export class MedicinelistComponent implements OnInit {


  p: number = 1;

  medicineList: any = {};

  arrPrescriptionId : number[]=[];

  selectAllChecked: boolean= false;

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMedicineList();
  }

  getMedicineList() {
    return this.authService.getAllMedicines(false).subscribe((response: any) => {
      this.medicineList = response.Data;
      this.medicineList.forEach(val => { val.checked = false });
    });
  }

  updateMedicineStatus(prescriptionId: number) {
    this.authService.updateMedicineStatus(prescriptionId).subscribe(next => {
      this.toastr.success("Medicine status updated successfully");
      this.getMedicineList();
    },
      error => {
        this.toastr.error("Something went wrong");
      }

    )
  }

  test(PrescriptionId: number)
  {
    this.arrPrescriptionId.push(PrescriptionId);
    //alert(this.medicineList(m=>m.checked != true).lengh)
    // if(this.medicineList(m=>m.checked != true).lengh == this.medicineList.length )
    // {
    //   alert('de-select select all')

    // }
    

    const list = this.medicineList.filter((medicine) => {
      return medicine.checked == true;
    });

    if(list.length != this.medicineList.length)
    {
      alert(list.length != this.medicineList.length)
this.selectAllChecked =false;
    }
    else
    {
this.selectAllChecked =true;

    }
  }

  selectAllChange()
  {
    if (this.medicineList.every(val => val.checked == true))
    this.medicineList.forEach(val => { val.checked = false });
  else
    this.medicineList.forEach(val => { val.checked = true });
  }

  deliveMedicines()
  {
    console.log(this.medicineList)
  }

}
