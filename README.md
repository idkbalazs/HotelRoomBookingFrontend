# HotelRoomBookingFrontend
## Contents   
  * Functional requirements
  * Roles
  * Use cases diagram
  * General description 
  * Database
  * Database diagram   
  * Introducing the Front End

### Functional requirements  
*Description of services to be provided:*   

* *As a registered user* I would like to book a room, specifying the floor on which the room is located and the length of the stay. (Booking) 
* *As a registered user* I would like to see what bookings I have made. (Listing of the bookings) 
* *As a registered user* I would like to delete a booking from my list. (Delete booking)
 <br/>  

* *As an admin* I would like to see the bookings for all users. (Listing of the bookings) 
* *As an admin* I would like to delete the bookings for each user. (Delete booking)   
<br/> 

### Roles   

* Entitlement groups
* Available functions
   

**Guest**: guest accesses the content of the main page, but cannot book a room unitl he / she registers.  
**Registered user**: in addition to the role of the guest, he / she can book a room, delete of modify a booking, or view all the bookings that he / she made.  
**Admin**: in addition to the role of the registered user, the admin can view all the bookings. Able to delete each individual booking.

### Use cases diagram
![Use case diagram](https://i.imgur.com/Oo1N605.png)
   
### General description   
  
* Once entering the main page you will be presented with two options Sign In / Sign up, along with a small description for each option. 
* Once signed in you will be able to book a room, specifying the floor on which the room is located, the number of the room and the length of the stay. 
* Once you made a booking your reservations list apprears, giving you all your reservations.
* From here you will be able to delete the given booking.     
 
### Database
 In the database we have some predefined values, mainly for testing purposes. In addition we have an already registered User and Admin a account.
 To make the logging in easier and to skip the registration part, the following accounts can be used: 
 <br/> <br/> 
 **User**: *Username* : userteszt 
           *Password* : password 
 <br/> <br/> 
 **Admin**:*Username* : admin 
           *Password* : password
 <br/> <br/> 
 ![Database](https://i.imgur.com/0HKWXEp.png)
            
 
### Database diagram 
 ![Database digram](https://i.imgur.com/hkG4uCy.png)

### Introducing the Front End 
Once entering the main page you will be presented with two options Sign In / Sign up, along with a small description for each option. 
<br/>
<br/>
![Main page](https://i.imgur.com/xoanudW.png)
<br/>
<br/>
Choosing the Sign In option you will be redirected to the Sign In page:
<br/>
<br/>
![Sign In page](https://i.imgur.com/W89JxPu.png)
<br/>
<br/>
In case you are not registered you will be clicking the Sign Up button which redirects you to the Sign Up page:
<br/>
<br/>
![Sign Up page](https://i.imgur.com/uT4KHSi.png)
<br/>
<br/>
Once signed in you will be able to book a room, specifying the floor on which the room is located, the number of the room and the length of the stay.
<br/>
<br/>
![Booking page](https://i.imgur.com/tgZJpzZ.png)
![floor](https://i.imgur.com/5TpEk17.png)
![room](https://i.imgur.com/djaLbIL.png)
![date](https://i.imgur.com/kpJACFn.png)
<br/>
The dates on the calendar will turn gray, illustrating the days on which our selected room is already reserved.
![reserved_room](https://i.imgur.com/ybfSN7L.png)
<br/>
<br/>
Clicking on the profile icon on the top right corner of the page: 
<br/>
<br/>
![Profile icon](https://i.imgur.com/clywGgo.png)
<br/>
<br/>
You will be presented with the following options: 
<br/>
<br/>
![options](https://i.imgur.com/oTYpcaZ.png)
<br/>
<br/>
Choosing the User reservations option you will be redirected to the Listing page, where you can view and delete your listings.
<br/>
<br/>
![listings](https://i.imgur.com/eUyskOK.png)
<br/>
<br/>
If you want to delete a booking click the "trash can" icon 
<br/>
<br/>
![row](https://i.imgur.com/j3DTHRG.png)
<br/>
<br/>
Upon clicking you will be asked to approve your decision.
<br/>
<br/>
![delete](https://i.imgur.com/KRtQofM.png)
<br/>
<br/>
Under the Profile option
<br/>
<br/>
![profile](https://i.imgur.com/ujgEiVF.png)
<br/>
<br/>
you will be able to change your password
<br/>
<br/>
![password change](https://i.imgur.com/XAjf09s.png)
<br/>
<br/>
Choosing the Log Out option you will be logged out and redirected to the home page.
<br/>
<br/>
The admin has the option to view all the bookings under the User reservations menu item.
<br/>
<br/>
![admin](https://i.imgur.com/3zNxjNf.png)
<br/>
And delete them, by following the methodology described above.

### Note
In case if the deployment doesn't work due to any service error, we would kindly ask you to download both the front end and the back end, and use the following commands:
<br/> <br/> 
 **Back end**: *mvc spring-boot:run*
 <br/> <br/> 
 **Front end**: *npm install* <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*npm run*      
 <br/> <br/> 
