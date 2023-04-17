import Text "mo:base/Text";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";

actor healthchain {

  ///////////////////////////////////////// ProfileData //////////////////////////////////////////////////

  let admin : Principal = Principal.fromText("ac2di-x5z7e-hcljz-xwyz2-suidp-vtnqm-ltex2-zznlz-6iopb-n2yoq-5ae");

  public type ProfileData = {
    user_principal : Principal;
    registered_on : Time.Time;
    name : Text;
    email : Text;
    address : Text;
    contact : Text;
    age : Text;
    gender : Text;
    image : [Nat8];
    user_type : Text;
  };

  private stable var userProfileDataList : List.List<ProfileData> = List.nil<ProfileData>();

  public shared (msg) func createProfile(
    name_data : Text,
    email_data : Text,
    address_data : Text,
    contact_data : Text,
    age_data : Text,
    gender_data : Text,
    image_data : [Nat8],
  ) : async ProfileData {

    Debug.print(Text.concat("createProfile ", debug_show (msg.caller)));

    let profileData : ?ProfileData = List.find(
      userProfileDataList,
      func(profData : ProfileData) : Bool {
        return profData.user_principal == msg.caller;
      },
    );

    switch (profileData) {
      case null {

        let newProfileData : ProfileData = {
          user_principal = msg.caller;
          registered_on = Time.now();
          name = name_data;
          email = email_data;
          address = address_data;
          contact = contact_data;
          age = age_data;
          gender = gender_data;
          image = image_data;
          user_type = "patient";
        };

        userProfileDataList := List.push(newProfileData, userProfileDataList);

        return newProfileData

      };
      case (?result) {

        var updatedProfileData = List.map(
          userProfileDataList,
          func(profile : ProfileData) : ProfileData {
            if (profile.user_principal == msg.caller) {

              let newProfileData : ProfileData = {
                user_principal = msg.caller;
                registered_on = result.registered_on;
                name = name_data;
                email = email_data;
                address = address_data;
                contact = contact_data;
                age = age_data;
                gender = gender_data;
                image = image_data;
                user_type = result.user_type;
              };

              return newProfileData;

            } else {
              return profile;
            };
          },
        );

        userProfileDataList := updatedProfileData;

        return result;
      };
    };

  };

  public shared query (msg) func readProfileData() : async ?ProfileData {

    Debug.print(Text.concat("readProfileData ", debug_show (msg.caller)));

    return List.find(
      userProfileDataList,
      func(profileData : ProfileData) : Bool {
        return profileData.user_principal == msg.caller;
      },
    );
  };

  public shared query (msg) func readPatients() : async [ProfileData] {

    Debug.print(Text.concat("readPatients ", debug_show (msg.caller)));

    if (msg.caller == admin) {
      var profData = List.filter(
        userProfileDataList,
        func(log : ProfileData) : Bool {
          return log.user_type == "patient";
        },
      );
      return List.toArray(profData);
    } else {
      return [];
    };
  };

  public shared query (msg) func getPatientById(principal_id_data : Text) : async ?ProfileData {

    Debug.print(Text.concat("getPatientById ", debug_show (msg.caller)));

    return List.find(
      userProfileDataList,
      func(patient : ProfileData) : Bool {
        return Principal.toText(patient.user_principal) == principal_id_data;
      },
    );
  };

  public shared query (msg) func readDoctors() : async [ProfileData] {

    Debug.print(Text.concat("readDoctors ", debug_show (msg.caller)));

    var profData = List.filter(
      userProfileDataList,
      func(log : ProfileData) : Bool {
        return log.user_type == "doctor";
      },
    );
    return List.toArray(profData);
    // } else {
    //   return [];
    // };
  };

  public shared query (msg) func getDoctorById(principal_id_data : Text) : async ?ProfileData {

    Debug.print(Text.concat("getDoctorById ", debug_show (msg.caller)));

    return List.find(
      userProfileDataList,
      func(doctor : ProfileData) : Bool {
        return Principal.toText(doctor.user_principal) == principal_id_data;
      },
    );
  };

  public shared (msg) func updateUserType(userPrincipal : Principal, account_type : Text) {

    Debug.print(Text.concat("updateUserType ", debug_show (msg.caller)));

    if (msg.caller == admin) {

      var updatedProfileData = List.map(
        userProfileDataList,
        func(profile : ProfileData) : ProfileData {
          if (profile.user_principal == userPrincipal) {

            let updatedData : ProfileData = {
              user_principal = profile.user_principal;
              registered_on = profile.registered_on;
              name = profile.name;
              email = profile.email;
              address = profile.address;
              contact = profile.contact;
              age = profile.age;
              gender = profile.gender;
              image = profile.image;
              user_type = account_type;
            };
            return updatedData;

          } else {
            return profile;
          };
        },
      );

      Debug.print(debug_show (updatedProfileData));

      userProfileDataList := updatedProfileData;
    };

  };

  ///////////////////////////////////////// Appointment //////////////////////////////////////////////////

  public type Appointment = {
    appointment_id : Text;
    patient_id : Principal;
    doctor_id : Principal;
    patient_name : Text;
    doctor_name : Text;
    time_slot : Text;
    date : Text;
  };

  private stable var appointments : List.List<Appointment> = List.nil<Appointment>();

  public shared (msg) func createAppointment(
    appointment_id_data : Text,
    patient_id_data : Text,
    doctor_id_data : Text,
    time_slot_data : Text,
    date_data : Text,
  ) {

    Debug.print(Text.concat("createAppointment ", debug_show (msg.caller)));

    var doc : ?ProfileData = await getDoctorById(doctor_id_data);

    switch (doc) {
      //For Patient Notification
      case null {
        Debug.print("Doctor Not Found while creating notification of Appointment");
      };
      case (?docData) {

        var pat : ?ProfileData = await getPatientById(patient_id_data);

        switch (pat) {
          //For Doctor Notification
          case null {
            Debug.print("Patient Not Found while creating notification of Appointment");
          };
          case (?patData) {

            let newAppointment : Appointment = {
              appointment_id = appointment_id_data;
              patient_id = Principal.fromText(patient_id_data);
              doctor_id = Principal.fromText(doctor_id_data);
              patient_name = patData.name;
              doctor_name = docData.name;
              time_slot = time_slot_data;
              date = date_data;
            };
            appointments := List.push(newAppointment, appointments);

            var patientNotification = Text.concat(
              Text.concat("Your appointment has been set with Dr. ", docData.name),
              Text.concat(
                Text.concat(" on ", date_data),
                Text.concat(" at ", time_slot_data),
              ),
            );

            createNotification(
              patient_id_data,
              patientNotification,
            );

            var docNotification = Text.concat(
              Text.concat(patData.name, " has booked an appointment with you"),
              Text.concat(
                Text.concat(" on ", date_data),
                Text.concat(" at ", time_slot_data),
              ),
            );
            createNotification(
              doctor_id_data,
              docNotification,
            );
          };
        };
      };
    };

  };

  public shared (msg) func createAppointmentPatientSide(
    appointment_id_data : Text,
    doctor_id_data : Text,
    time_slot_data : Text,
    date_data : Text,
  ) {

    Debug.print(Text.concat("createAppointmentPatientSide ", debug_show (msg.caller)));

    var doc : ?ProfileData = await getDoctorById(doctor_id_data);

    switch (doc) {
      //For Patient Notification
      case null {
        Debug.print("Doctor Not Found while creating notification of Appointment");
      };
      case (?docData) {

        var pat : ?ProfileData = await getPatientById(Principal.toText(msg.caller));

        switch (pat) {
          //For Doctor Notification
          case null {
            Debug.print("Patient Not Found while creating notification of Appointment");
          };
          case (?patData) {

            let newAppointment : Appointment = {
              appointment_id = appointment_id_data;
              patient_id = msg.caller;
              doctor_id = Principal.fromText(doctor_id_data);
              doctor_name = docData.name;
              patient_name = patData.name;
              time_slot = time_slot_data;
              date = date_data;
            };
            appointments := List.push(newAppointment, appointments);

            var docNotification = Text.concat(
              Text.concat(patData.name, " has booked an appointment with you"),
              Text.concat(
                Text.concat(" on ", date_data),
                Text.concat(" at ", time_slot_data),
              ),
            );
            createNotification(
              doctor_id_data,
              docNotification,
            );

            var patNotification = Text.concat(
              Text.concat("Your appointment has been set with Dr. ", docData.name),
              Text.concat(
                Text.concat(" on ", date_data),
                Text.concat(" at ", time_slot_data),
              ),
            );
            createNotification(
              Principal.toText(msg.caller),
              patNotification,
            );
          };
        };
      };
    };

  };

  // For Admin
  public shared query (msg) func readAllAppointments() : async [Appointment] {
    if (msg.caller == admin) {
      return List.toArray(appointments);
    } else {
      return [];
    };
  };

  // For Doctors
  public shared query (msg) func readDoctorAppointments() : async [Appointment] {

    Debug.print(Text.concat("readDoctorAppointments ", debug_show (msg.caller)));

    var docAppointments = List.filter(
      appointments,
      func(appointment : Appointment) : Bool {
        return appointment.doctor_id == msg.caller;
      },
    );

    return List.toArray(docAppointments);
  };

  // For Patients
  public shared query (msg) func readPatientAppointments() : async [Appointment] {

    Debug.print(Text.concat("readPatientAppointments ", debug_show (msg.caller)));

    var patAppointments = List.filter(
      appointments,
      func(appointment : Appointment) : Bool {
        return appointment.patient_id == msg.caller;
      },
    );

    return List.toArray(patAppointments);
  };

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

  private stable var employees : List.List<Employee> = List.nil<Employee>();

  public shared (msg) func createEmployee(
    employee_id_data : Text,
    first_name_data : Text,
    last_name_data : Text,
    contact_data : Text,
    email_data : Text,
    salary_data : Int,
    date_of_joining_data : Text,
  ) {

    Debug.print(Text.concat("createEmployee ", debug_show (msg.caller)));

    if (msg.caller == admin) {

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

  };

  public shared query (msg) func readEmployees() : async [Employee] {

    Debug.print(Text.concat("readEmployees ", debug_show (msg.caller)));

    if (msg.caller == admin) {
      return List.toArray(employees);
    } else {
      return [];
    };
  };

  public shared (msg) func updateEmployee(
    employee_id_data : Text,
    first_name_data : Text,
    last_name_data : Text,
    contact_data : Text,
    email_data : Text,
    salary_data : Int,
    date_of_joining_data : Text,
  ) {

    Debug.print(Text.concat("updateEmployee ", debug_show (msg.caller)));

    if (msg.caller == admin) {
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
  };

  public shared (msg) func deleteEmployee(employee_id_data : Text) {

    Debug.print(Text.concat("deleteEmployee ", debug_show (msg.caller)));

    if (msg.caller == admin) {
      var index : Nat = 0;
      var deleteIndex : Nat = 0;

      var updatedEmployees = List.map(
        employees,
        func(employee : Employee) : Employee {
          index := index +1;
          if (employee.employee_id == employee_id_data) {
            deleteIndex := index -1;
            return employee;
          } else {
            return employee;
          };
        },
      );

      let listFront = List.take(employees, deleteIndex);
      let listBack = List.drop(employees, deleteIndex +1);

      employees := List.append(listFront, listBack);
    };
  };

  ///////////////////////////////////////// MedicalLog //////////////////////////////////////////////////

  public type MedicalLog = {
    patient_id : Principal;
    doctor_id : Principal;
    doctor_name : Text;
    time_stamp : Time.Time;
    pulse_rate : Float;
    blood_pressure : Int;
    spo2 : Int;
    temperature : Float;
    additional_notes : Text;
    medications : Text;
    blood_group : Text;
    weight : Float;
    height : Float;
  };

  private stable var medicalLogs : List.List<MedicalLog> = List.nil<MedicalLog>();

  public shared (msg) func createMedicalLog(
    patient_id_data : Text,
    pulse_rate_data : Float,
    blood_pressure_data : Int,
    spo2_data : Int,
    temperature_data : Float,
    additional_notes_data : Text,
    medications_data : Text,
    blood_group_data : Text,
    weight_data : Float,
    height_data : Float,
  ) {

    //TODO add Authorisation here

    Debug.print(Text.concat("createMedicalLog ", debug_show (msg.caller)));

    var doc : ?ProfileData = await getDoctorById(Principal.toText(msg.caller));

    switch (doc) {
      //For Patient Notification
      case null {};
      case (?docData) {

        let newMedicalLog : MedicalLog = {
          patient_id = Principal.fromText(patient_id_data);
          doctor_id = msg.caller;
          doctor_name = docData.name;
          time_stamp = Time.now();
          pulse_rate = pulse_rate_data;
          blood_pressure = blood_pressure_data;
          spo2 = spo2_data;
          temperature = temperature_data;
          additional_notes = additional_notes_data;
          medications = medications_data;
          blood_group = blood_group_data;
          weight = weight_data;
          height = height_data;
        };

        medicalLogs := List.push(newMedicalLog, medicalLogs);

        var patientNotification = Text.concat(
          Text.concat("Dr. ", docData.name),
          " added a Medical Log for your recent appointment",
        );

        createNotification(
          patient_id_data,
          patientNotification,
        );
      };
    };

    Debug.print(debug_show (medicalLogs));

  };

  private stable var mapOfMedicalLogAccessEntries : [(Principal, [Principal])] = [];

  private var mapOfMedicalLogAccessHashMap = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);

  public shared (msg) func giveMedicalLogAccess(doctor_id : Principal) {

    Debug.print(Text.concat("giveMedicalLogAccess ", debug_show (msg.caller)));

    var medLogAccess : ?List.List<Principal> = mapOfMedicalLogAccessHashMap.get(msg.caller);

    switch (medLogAccess) {
      case null {

        var d_id_list : List.List<Principal> = List.nil<Principal>();

        d_id_list := List.push(msg.caller, d_id_list);

        d_id_list := List.push(doctor_id, d_id_list);

        mapOfMedicalLogAccessHashMap.put(msg.caller, d_id_list);
      };
      case (?result) {

        var d_id_list : List.List<Principal> = result;

        var hasDoctorId : ?Principal = List.find(
          d_id_list,
          func(d_id : Principal) : Bool {
            return d_id == doctor_id;
          },
        );

        switch (hasDoctorId) {
          case null {
            d_id_list := List.push(doctor_id, d_id_list);
          };
          case (?result) {

          };
        };

        mapOfMedicalLogAccessHashMap.put(msg.caller, d_id_list);

      };
    };
  };

  public shared (msg) func revokeMedicalLogAccess(doctor_id : Principal) {

    Debug.print(Text.concat("revokeMedicalLogAccess ", debug_show (msg.caller)));

    var medLogAccess : ?List.List<Principal> = mapOfMedicalLogAccessHashMap.get(msg.caller);

    switch (medLogAccess) {
      case null {};
      case (?result) {

        var d_id_list : List.List<Principal> = result;

        Debug.print(debug_show (d_id_list));

        var index : Nat = 0;
        var deleteIndex : Nat = 0;

        var updatedAccessList = List.map(
          d_id_list,
          func(doc_id : Principal) : Principal {
            index := index +1;
            if (doc_id == doctor_id) {
              deleteIndex := index - 1;
              return doc_id;
            } else {
              return doc_id;
            };
          },
        );

        let listFront = List.take(d_id_list, deleteIndex);
        let listBack = List.drop(d_id_list, deleteIndex + 1);

        d_id_list := List.append(listFront, listBack);

        Debug.print(debug_show (d_id_list));

        mapOfMedicalLogAccessHashMap.put(msg.caller, d_id_list);

      };
    };
  };

  public shared query (msg) func hasAccessToPatientMedicalLogs(patient_id : Text) : async Bool {

    Debug.print(Text.concat("hasAccessToPatientMedicalLogs ", debug_show (msg.caller)));

    var medLogAccess : ?List.List<Principal> = mapOfMedicalLogAccessHashMap.get(Principal.fromText(patient_id));

    switch (medLogAccess) {
      case null {
        return false;
      };
      case (?result) {
        var d_id_list : List.List<Principal> = result;
        var hasDoctorId : ?Principal = List.find(
          d_id_list,
          func(d_id : Principal) : Bool {
            return d_id == msg.caller;
          },
        );

        switch (hasDoctorId) {
          case null {
            return false;
          };
          case (?result) {
            return true;
          };
        };
      };
    };

  };

  public shared query (msg) func getPatientMedicalLogsAccessList() : async [Principal] {

    Debug.print(Text.concat("getPatientMedicalLogsAccessList ", debug_show (msg.caller)));

    var medLogAccess : ?List.List<Principal> = mapOfMedicalLogAccessHashMap.get(msg.caller);

    switch (medLogAccess) {
      case null {
        return [];
      };
      case (?result) {
        return List.toArray(result);
      };
    };

  };

  system func preupgrade() {
    var buffer : List.List<(Principal, [Principal])> = List.nil<(Principal, [Principal])>();

    for ((patient_id, doctor_id_list) in mapOfMedicalLogAccessHashMap.entries()) {
      var doc_id_list : [Principal] = List.toArray(doctor_id_list);

      buffer := List.push((patient_id, doc_id_list), buffer);

    };
    mapOfMedicalLogAccessEntries := List.toArray(buffer);
  };

  system func postupgrade() {
    for ((patient_id, doctor_id_list) in mapOfMedicalLogAccessEntries.vals()) {
      mapOfMedicalLogAccessHashMap.put(patient_id, List.fromArray(doctor_id_list));
    };
  };

  // TODO add Authorisation Here
  public shared query (msg) func readMedicalLogs(patient_id : Text) : async [MedicalLog] {

    Debug.print(Text.concat("readMedicalLogs ", debug_show (msg.caller)));

    var medLogAccess : ?List.List<Principal> = mapOfMedicalLogAccessHashMap.get(Principal.fromText(patient_id));

    switch (medLogAccess) {
      case null {
        return [];
      };
      case (?result) {
        var d_id_list : List.List<Principal> = result;
        var hasDoctorId : ?Principal = List.find(
          d_id_list,
          func(d_id : Principal) : Bool {
            return d_id == msg.caller;
          },
        );

        switch (hasDoctorId) {
          case null {
            return [];
          };
          case (?result) {
            var patMedicalLogList = List.filter(
              medicalLogs,
              func(log : MedicalLog) : Bool {
                return Principal.toText(log.patient_id) == patient_id;
              },
            );
            return List.toArray(patMedicalLogList);
          };
        };
      };
    };
  };

  ///////////////////////////////////////// Department //////////////////////////////////////////////////

  private stable var departments : [Text] = [
    "Cardiology",
    "Dermitology",
    "General Surgery",
    "Microbiology",
    "Radiology",
    "Medical Gastroenterology",
    "Electrophysiology",
    "Orthopaedics",
    "Diabetology",
    "Gynaecology",
    "ENT(Ear, Nose, Throat)",
    "Reproductive Medicine",
    "Gastrointestinal Oncology",
    "Blood Bank",
    "Emergency Medicine",
    "Clinical Nutrition & Dietetics",
    "Neurology",
    "Dental Sciences",
    "Endocrinology",
    "Neurosurgery",
    "Pediatrics",
  ];

  public query func readDepartments() : async [Text] {
    return departments;
  };

  ///////////////////////////////////////// Doctor //////////////////////////////////////////////////

  public type DoctorMetaData = {
    doctor_id : Principal;
    designation : Text;
    qualification : Text;
    department : Text;
  };

  private stable var doctorMetaDataList : List.List<DoctorMetaData> = List.nil<DoctorMetaData>();

  //TODO add Authorisation here
  public shared query (msg) func getDoctorMetaDataById(doctor_id_data : Text) : async ?DoctorMetaData {

    Debug.print(Text.concat("getDoctorMetaDataById ", debug_show (msg.caller)));

    return List.find(
      doctorMetaDataList,
      func(doctor : DoctorMetaData) : Bool {
        return Principal.toText(doctor.doctor_id) == doctor_id_data;
      },
    );
  };

  //TODO add Authorisation here
  public shared (msg) func createOrUpdateDoctorMetaData(
    doctor_id_data : Principal,
    designation_data : Text,
    qualification_data : Text,
    department_data : Text,
  ) {

    Debug.print(Text.concat("createOrUpdateDoctorMetaData ", debug_show (msg.caller)));

    let doctorMetaData : ?DoctorMetaData = List.find(
      doctorMetaDataList,
      func(docMetaData : DoctorMetaData) : Bool {
        return docMetaData.doctor_id == doctor_id_data;
      },
    );

    let newDoctorMetaData : DoctorMetaData = {
      doctor_id = doctor_id_data;
      designation = designation_data;
      qualification = qualification_data;
      department = department_data;
    };

    switch (doctorMetaData) {
      case null {
        doctorMetaDataList := List.push(newDoctorMetaData, doctorMetaDataList);
      };
      case (?result) {

        var updatedDoctorMetaData = List.map(
          doctorMetaDataList,
          func(docMetaData : DoctorMetaData) : DoctorMetaData {
            if (docMetaData.doctor_id == doctor_id_data) {
              return newDoctorMetaData;
            } else {
              return docMetaData;
            };
          },
        );
        doctorMetaDataList := updatedDoctorMetaData;
      };
    };

  };

  public shared query (msg) func readDoctorMetaData() : async [DoctorMetaData] {

    Debug.print(Text.concat("readDoctorMetaData ", debug_show (msg.caller)));
    return List.toArray(doctorMetaDataList);
  };

  ///////////////////////////////////////// Doctor Open Hours ///////////////////////////////////////////////////////

  public type DoctorOpenHours = {
    doctor_id : Principal;
    openHoursDates : [Text];
    openHoursTime : [[Text]];

  };

  private stable var doctor_open_hours_list : List.List<DoctorOpenHours> = List.nil<DoctorOpenHours>();

  // TODO add Authorisation Here
  public shared (msg) func createOrUpdateDoctorOpenHours(
    openHoursDates_data : [Text],
    openHoursTime_data : [[Text]],
  ) : async () {

    Debug.print(Text.concat("createOrUpdateDoctorMetaData ", debug_show (msg.caller)));

    let doctorOpenHour : ?DoctorOpenHours = List.find(
      doctor_open_hours_list,
      func(docOpenHour : DoctorOpenHours) : Bool {
        return docOpenHour.doctor_id == msg.caller;
      },
    );

    let newOpenHour : DoctorOpenHours = {
      doctor_id = msg.caller;
      openHoursDates = openHoursDates_data;
      openHoursTime = openHoursTime_data;
    };

    switch (doctorOpenHour) {
      case null {
        doctor_open_hours_list := List.push(newOpenHour, doctor_open_hours_list);
      };
      case (?result) {

        var updatedDoctorOpenHourList = List.map(
          doctor_open_hours_list,
          func(docOpenHour : DoctorOpenHours) : DoctorOpenHours {
            if (docOpenHour.doctor_id == msg.caller) {
              return newOpenHour;
            } else {
              return docOpenHour;
            };
          },
        );
        doctor_open_hours_list := updatedDoctorOpenHourList;
      };
    };

  };

  // TODO add Authorisation Here
  public shared query (msg) func readOpenHours() : async [DoctorOpenHours] {

    Debug.print(Text.concat("readOpenHours ", debug_show (msg.caller)));

    return List.toArray(doctor_open_hours_list);
  };

  // TODO add Authorisation Here
  public shared query (msg) func readOpenHoursById(doctor_id : Text) : async ?DoctorOpenHours {

    Debug.print(Text.concat("readOpenHoursById ", debug_show (msg.caller)));

    return List.find(
      doctor_open_hours_list,
      func(doctorOpenHours : DoctorOpenHours) : Bool {
        return Principal.toText(doctorOpenHours.doctor_id) == doctor_id;
      },
    );
  };

  ///////////////////////////////////////// Notice ///////////////////////////////////////////////////////

  public type Notice = {
    time_stamp : Time.Time;
    from : Text;
    notice : Text;
  };

  private stable var notices : List.List<Notice> = List.nil<Notice>();

  // TODO add Authorisation Here
  public shared (msg) func createNotice(fromText : Text, noticeText : Text) {
    let newNotice : Notice = {
      time_stamp = Time.now();
      from = fromText;
      notice = noticeText;
    };

    Debug.print(Text.concat("createNotice ", debug_show (msg.caller)));

    notices := List.push(newNotice, notices);

    Debug.print(debug_show (notices));

  };

  // TODO add Authorisation Here
  public shared query (msg) func readNotices() : async [Notice] {
    Debug.print(Text.concat("readNotices ", debug_show (msg.caller)));
    return List.toArray(notices);
  };

  ///////////////////////////////////////// Notification ///////////////////////////////////////////////////////

  public type Notification = {
    time_stamp : Time.Time;
    for_id : Principal;
    notification : Text;
  };

  private stable var notifications : List.List<Notification> = List.nil<Notification>();

  // TODO add Authorisation Here
  public shared (msg) func createNotification(for_id_data : Text, notification_data : Text) {
    let newNotification : Notification = {
      time_stamp = Time.now();
      for_id = Principal.fromText(for_id_data);
      notification = notification_data;
    };

    Debug.print(Text.concat("createNotification ", debug_show (msg.caller)));

    notifications := List.push(newNotification, notifications);
  };

  // TODO add Authorisation Here
  public shared query (msg) func readNotifications() : async [Notification] {

    Debug.print(Text.concat("readNotifications ", debug_show (msg.caller)));

    var userSpecificNotifications = List.filter(
      notifications,
      func(notification : Notification) : Bool {
        return notification.for_id == msg.caller;
      },
    );

    return List.toArray(userSpecificNotifications);
  };

  public shared query (msg) func getTextTimeStampFromEpoch(nanos : Time.Time) : async Text {

    Debug.print(Text.concat("getTextTimeStampFromEpoch ", debug_show (msg.caller)));

    let secondsSinceEpoch = (nanos / 1_000_000_000);

    let days = secondsSinceEpoch / 86_400;
    let hours = (secondsSinceEpoch % 86_400) / 3_600;
    let minutes = (secondsSinceEpoch % 3_600) / 60;
    let secondsRemaining = secondsSinceEpoch % 60;

    let nanosRemaining = nanos % 1_000_000_000;

    var year = 1970 : Nat;

    var dayMutable = days;

    while (dayMutable > 366) {
      let is4thYear = (year % 4) == 0;
      let isNot100thYear : Bool = (year % 100) != 0;
      let is400thYear : Bool = (year % 400) == 0;

      year += 1;
      if ((is4thYear and isNot100thYear) or is400thYear) {
        dayMutable := dayMutable - 366;
      } else {
        dayMutable := dayMutable - 365;
      };
    };

    let days_per_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var i = 0;
    var month = 0;
    label monthLoop for (i in Iter.range(0, 11)) {

      if (dayMutable > days_per_month[i]) {
        dayMutable := dayMutable - days_per_month[i];
      } else {
        month := i + 1;
        break monthLoop;
      };
    };

    var dayText = Int.toText(dayMutable + 1);
    var monthText = Int.toText(month);
    var yearText = Int.toText(dayMutable + 1);
    var hoursText = Int.toText(hours);
    var minutesText = Int.toText(minutes);
    var secondsText = Int.toText(secondsRemaining);

    var finalDateText = Text.concat(
      Text.concat(
        Text.concat(dayText, "-"),
        Text.concat(monthText, "-"),
      ),
      yearText,
    );

    var finalTimeText = Text.concat(
      Text.concat(
        Text.concat(hoursText, ":"),
        Text.concat(minutesText, ":"),
      ),
      secondsText,
    );

    var finalTimeStampText = Text.concat(
      Text.concat(
        finalDateText,
        ",",
      ),
      finalTimeText,
    );

    return finalTimeStampText;
  };

};
