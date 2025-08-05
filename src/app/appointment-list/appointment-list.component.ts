import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  newAppointmentsTitle : string = "";
  newAppointmentsDate  : Date = new Date();

  appointments: Appointment[] = [];
  
  ngOnInit(): void {
    // Load appointments from localStorage if available
    const storedAppointments = localStorage.getItem('appoinments');
    if (storedAppointments) {
      this.appointments = JSON.parse(storedAppointments);
    } else {
      this.appointments = [];
    }
    
  }


  addAppointment() {
   if(this.newAppointmentsTitle.trim().length && this.newAppointmentsDate){
     
      let newAppoinment : Appointment = {
        id: new Date().getTime(), // Using timestamp as a simple unique ID
        title: this.newAppointmentsTitle,
        date: this.newAppointmentsDate
      }

      this.appointments.push(newAppoinment);

      this.newAppointmentsTitle = "";
      this.newAppointmentsDate = new Date();

      // Save appointments to localStorage
      localStorage.setItem('appoinments', JSON.stringify(this.appointments));
   }
  }

  deleteAppointment(index: number){
    if(confirm("Are you sure you want to delete this appointment?")) {
      this.appointments.splice(index, 1);

      // Update localStorage after deletion
      localStorage.setItem('appoinments', JSON.stringify(this.appointments));
    }
  }

}