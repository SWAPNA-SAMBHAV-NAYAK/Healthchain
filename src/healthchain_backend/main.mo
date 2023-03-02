import Text "mo:base/Text";
import List "mo:base/List";
import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Time "mo:base/Time";

actor healthchain {

  ///////////////////////////////////////// Employee //////////////////////////////////////////////////

  public type Employee = {
    employee_id : Text;
    first_name : Text;
    last_name : Text;
    contact : Text;
    email : Text;
    salary : Int;
    date_of_joining : Text;
  };

  stable var employees : List.List<Employee> = List.nil<Employee>();

  public func createEmployee(
    employee_id_data : Text,
    first_name_data : Text,
    last_name_data : Text,
    contact_data : Text,
    email_data : Text,
    salary_data : Int,
    date_of_joining_data : Text,
  ) {

    let newEmployee : Employee = {
      employee_id = employee_id_data;
      first_name = first_name_data;
      last_name = last_name_data;
      email = email_data;
      contact = contact_data;
      salary = salary_data;
      date_of_joining = date_of_joining_data;
    };

    employees := List.push(newEmployee, employees);

    Debug.print(debug_show (employees));

  };

  public query func readEmployees() : async [Employee] {
    return List.toArray(employees);
  };

 public func updateEmployee(
    employee_id_data : Text,
    first_name_data : Text,
    last_name_data : Text,
    contact_data : Text,
    email_data : Text,
    salary_data : Int,
    date_of_joining_data : Text,
  ) {

    let updatedEmployee : Employee = {
      employee_id = employee_id_data;
      first_name = first_name_data;
      last_name = last_name_data;
      email = email_data;
      contact = contact_data;
      salary = salary_data;
      date_of_joining = date_of_joining_data;
    };

    var updatedEmployees = List.map(
      employees,
      func(employee : Employee) : Employee {
        if (employee.employee_id == employee_id_data) {
          return updatedEmployee;
        } else {
          return employee;
        };
      },
    );
    employees := updatedEmployees;
  };

    public func deleteEmployee(employee_id_data : Text) {

    var index : Nat = 0;
    var deleteIndex : Nat = 0;

    var updatedEmployees = List.map(
      employees,
      func(employee : Employee) : Employee {
        index := index+1;
        if (employee.employee_id == employee_id_data) {
          deleteIndex := index-1;
          return employee;
        } else {
          return employee;
        };
      },
    );

    let listFront = List.take(employees, deleteIndex);
    let listBack = List.drop(employees, deleteIndex+1);

    employees := List.append(listFront, listBack);
  };



  ///////////////////////////////////////// Patient //////////////////////////////////////////////////

  public type MedicalLog = {
    time_stamp : Time.Time;
    pulse_rate : Float;
    blood_pressure : Int;
    spo2 : Int;
    temperature : Float;
  };

  public type Patient = {
    patient_id : Text;
    registered_on : Time.Time;
    name : Text;
    email : Text;
    phone_number : Text;
    age : Int;
    address : Text;
    blood_group : Text;
    weight : Float;
    height : Float;
    gender : Text;
    logs : [MedicalLog];
  };

  stable var patients : List.List<Patient> = List.nil<Patient>();

  public func createPatient(
    patient_id_data : Text,
    name_data : Text,
    email_data : Text,
    phone_number_data : Text,
    age_data : Int,
    address_data : Text,
    blood_group_data : Text,
    weight_data : Float,
    height_data : Float,
    gender_data : Text,
    logs_data : [MedicalLog],
  ) {

    let newPatient : Patient = {
      patient_id = patient_id_data;
      registered_on = Time.now();
      name = name_data;
      email = email_data;
      phone_number = phone_number_data;
      age = age_data;
      address = address_data;
      blood_group = blood_group_data;
      weight = weight_data;
      height = height_data;
      gender = gender_data;
      logs = logs_data;
    };

    patients := List.push(newPatient, patients);

    Debug.print(debug_show (patients));

  };

  public query func readPatients() : async [Patient] {
    return List.toArray(patients);
  };

  ///////////////////////////////////////// Notice ///////////////////////////////////////////////////////

  public type Notice = {
    time_stamp : Time.Time;
    from : Text;
    notice : Text;
  };

  var notices : List.List<Notice> = List.nil<Notice>();

  public func createNotice(fromText : Text, noticeText : Text) {
    let newNotice : Notice = {
      time_stamp = Time.now();
      from = fromText;
      notice = noticeText;
    };

    notices := List.push(newNotice, notices);

    Debug.print(debug_show (notices));

  };

  public query func readNotices() : async [Notice] {
    return List.toArray(notices);
  };

};





