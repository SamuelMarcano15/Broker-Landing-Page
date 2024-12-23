import { ChangeEvent, FormEvent, useState } from "react";
import '../assets/styles/login.css'
import OpenEye from "./icons/OpenEye";
import CloseEye from "./icons/CloseEye";
import { createAccount } from "./API/UserApi";
import { toast } from "react-toastify";
import EmailIcon from "./icons/EmailIcon";
import PasswordIcon from "./icons/PasswordIcon";
import 'react-phone-number-input/style.css'
import PhoneInput, {isPossiblePhoneNumber} from 'react-phone-number-input'
import Select, { components } from "react-select";
type Props ={
  changeForm:((type:string) => void)
}

const Register = ({changeForm}:Props) => {
  type E164Number = string; // Define E164Number type as needed
  const selectStylePayments = {
    control: (provided: any, state: any) => ({
      ...provided,
      background: "#192229",
      textColor: "white",
      color: "white !important",
      border: state.isFocused ? "1px solid #ffffff" : "1px solid #ffffff",
      borderRadius: "5px",
      boxShadow: state.isFocused ? "none" : "none",
      "&:hover": {
        border: state.isFocused ? "1px solid #ffffff" : "1px solid #ffffff",
      },
      "&:focus": {
        border: state.isFocused ? "1px solid #ffffff" : "1px solid #ffffff",
      },
    }),

    option:  (provided: any, state:any) => ({
        ...provided,
        padding:10,
        margin:0,
        background: state.isFocused ? "#212529" : '#192229',
        color: state.isDisabled ? '#ffffff' : '#ffffff',
        zIndex: 1
    }),

    input: (provided: any) => ({
      ...provided,
      color: "white",
    }),

    placeholder: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "white", // Custom colour
    }),
  };
  const [valuePhone, setValuePhone] = useState<E164Number | undefined>()
  const [listCountries] = useState([

    {
        "value": "GBR - United Kingdom",
        "label": "United Kingdom"
    },
    {
        "value": "AFG - Afghanistan",
        "label": "Afghanistan"
    },
    {
        "value": "ALA - Aland Islands",
        "label": "Aland Islands"
    },
    {
        "value": "ALB - Albania",
        "label": "Albania"
    },
    {
        "value": "DZA - Algeria",
        "label": "Algeria"
    },
    {
        "value": "ASM - American Samoa",
        "label": "American Samoa"
    },
    {
        "value": "AND - Andorra",
        "label": "Andorra"
    },
    {
        "value": "AGO - Angola",
        "label": "Angola"
    },
    {
        "value": "AIA - Anguilla",
        "label": "Anguilla"
    },
    {
        "value": "ATA - Antarctica",
        "label": "Antarctica"
    },
    {
        "value": "ATG - Antigua And Barbuda",
        "label": "Antigua And Barbuda"
    },
    {
        "value": "ARG - Argentina",
        "label": "Argentina"
    },
    {
        "value": "ARM - Armenia",
        "label": "Armenia"
    },
    {
        "value": "ABW - Aruba",
        "label": "Aruba"
    },
    {
        "value": "AUS - Australia",
        "label": "Australia"
    },
    {
        "value": "AUT - Austria",
        "label": "Austria"
    },
    {
        "value": "AZE - Azerbaijan",
        "label": "Azerbaijan"
    },
    {
        "value": "BHS - Bahamas",
        "label": "Bahamas"
    },
    {
        "value": "BHR - Bahrain",
        "label": "Bahrain"
    },
    {
        "value": "BGD - Bangladesh",
        "label": "Bangladesh"
    },
    {
        "value": "BRB - Barbados",
        "label": "Barbados"
    },
    {
        "value": "BLR - Belarus",
        "label": "Belarus"
    },
    {
        "value": "BEL - Belgium",
        "label": "Belgium"
    },
    {
        "value": "BLZ - Belize",
        "label": "Belize"
    },
    {
        "value": "BEN - Benin",
        "label": "Benin"
    },
    {
        "value": "BMU - Bermuda",
        "label": "Bermuda"
    },
    {
        "value": "BTN - Bhutan",
        "label": "Bhutan"
    },
    {
        "value": "BOL - Bolivia",
        "label": "Bolivia"
    },
    {
        "value": "BIH - Bosnia_Herzegovina",
        "label": "Bosnia-Herzegovina"
    },
    {
        "value": "BWA - Botswana",
        "label": "Botswana"
    },
    {
        "value": "BVT - Bouvet Island",
        "label": "Bouvet Island"
    },
    {
        "value": "BRA - Brazil",
        "label": "Brazil"
    },
    {
        "value": "VGB - British Virgin Islands",
        "label": "British Virgin Islands"
    },
    {
        "value": "BRN - Brunei Darussalam",
        "label": "Brunei Darussalam"
    },
    {
        "value": "BGR - Bulgaria",
        "label": "Bulgaria"
    },
    {
        "value": "BFA - Burkina Faso",
        "label": "Burkina Faso"
    },
    {
        "value": "BDI - Burundi",
        "label": "Burundi"
    },
    {
        "value": "KHM - Cambodia",
        "label": "Cambodia"
    },
    {
        "value": "CMR - Cameroon",
        "label": "Cameroon"
    },
    {
        "value": "CAN - Canada",
        "label": "Canada"
    },
    {
        "value": "CPV - Cape Verde Islands",
        "label": "Cape Verde Islands"
    },
    {
        "value": "CYM - Cayman Islands",
        "label": "Cayman Islands"
    },
    {
        "value": "CAF - Central African Republic",
        "label": "Central African Republic"
    },
    {
        "value": "TCD - Chad",
        "label": "Chad"
    },
    {
        "value": "CHL - Chile",
        "label": "Chile"
    },
    {
        "value": "CHN - China (PR)",
        "label": "China (PR)"
    },
    {
        "value": "CXR - Christmas Island",
        "label": "Christmas Island"
    },
    {
        "value": "CCK - Cocos (Keeling) Islands",
        "label": "Cocos (Keeling) Islands"
    },
    {
        "value": "COL - Colombia",
        "label": "Colombia"
    },
    {
        "value": "COM - Comoros",
        "label": "Comoros"
    },
    {
        "value": "COD - Congo, Democratic Republic of",
        "label": "Congo, Democratic Republic of"
    },
    {
        "value": "COG - Congo, Republic of",
        "label": "Congo, Republic of"
    },
    {
        "value": "COK- Cook Islands",
        "label": "Cook Islands"
    },
    {
        "value": "CRI - Costa Rica",
        "label": "Costa Rica"
    },
    {
        "value": "HRV - Croatia",
        "label": "Croatia"
    },
    {
        "value": "CUB - Cuba",
        "label": "Cuba"
    },
    {
        "value": "CYP - Cyprus",
        "label": "Cyprus"
    },
    {
        "value": "CZE - Czech Republic",
        "label": "Czech Republic"
    },
    {
        "value": "DNK - Denmark",
        "label": "Denmark"
    },
    {
        "value": "DJI - Djibouti",
        "label": "Djibouti"
    },
    {
        "value": "DMA - Dominica",
        "label": "Dominica"
    },
    {
        "value": "DOM - Dominican Republic",
        "label": "Dominican Republic"
    },
    {
        "value": "ECU - Ecuador",
        "label": "Ecuador"
    },
    {
        "value": "EGY - Egypt",
        "label": "Egypt"
    },
    {
        "value": "SLV - El Salvador",
        "label": "El Salvador"
    },
    {
        "value": "GNQ - Equatorial Guinea",
        "label": "Equatorial Guinea"
    },
    {
        "value": "ERI - Eritrea",
        "label": "Eritrea"
    },
    {
        "value": "EST - Estonia",
        "label": "Estonia"
    },
    {
        "value": "ETH - Ethiopia",
        "label": "Ethiopia"
    },
    {
        "value": "FLK - Falkland Islands",
        "label": "Falkland Islands"
    },
    {
        "value": "FRO - Faroe Islands",
        "label": "Faroe Islands"
    },
    {
        "value": "FJI - Fiji",
        "label": "Fiji"
    },
    {
        "value": "FIN - Finland",
        "label": "Finland"
    },
    {
        "value": "FRA - France",
        "label": "France"
    },
    {
        "value": "GUF - French Guyana",
        "label": "French Guyana"
    },
    {
        "value": "PYF - French Polynesia",
        "label": "French Polynesia"
    },
    {
        "value": "ATF - French Southern Territories",
        "label": "French Southern Territories"
    },
    {
        "value": "GAB - Gabon",
        "label": "Gabon"
    },
    {
        "value": "GMB - Gambia",
        "label": "Gambia"
    },
    {
        "value": "GEO - Georgia",
        "label": "Georgia"
    },
    {
        "value": "DEU - Germany",
        "label": "Germany"
    },
    {
        "value": "GHA - Ghana",
        "label": "Ghana"
    },
    {
        "value": "GIB - Gibraltar",
        "label": "Gibraltar"
    },
    {
        "value": "GRC - Greece",
        "label": "Greece"
    },
    {
        "value": "GRL - Greenland",
        "label": "Greenland"
    },
    {
        "value": "GRD - Grenada",
        "label": "Grenada"
    },
    {
        "value": "GLP - Guadeloupe",
        "label": "Guadeloupe"
    },
    {
        "value": "GUM - Guam",
        "label": "Guam"
    },
    {
        "value": "GTM - Guatemala",
        "label": "Guatemala"
    },
    {
        "value": "GGY - Guernsey",
        "label": "Guernsey"
    },
    {
        "value": "GIN - Guinea",
        "label": "Guinea"
    },
    {
        "value": "GNB - Guinea Bissau",
        "label": "Guinea-Bissau"
    },
    {
        "value": "GUY - Guyana",
        "label": "Guyana"
    },
    {
        "value": "HTI - Haiti",
        "label": "Haiti"
    },
    {
        "value": "HMD - Heard Island and McDonald Islands",
        "label": "Heard Island and McDonald Islands"
    },
    {
        "value": "VAT - Holy See (Vatican City State)",
        "label": "Holy See (Vatican City State)"
    },
    {
        "value": "HND - Honduras",
        "label": "Honduras"
    },
    {
        "value": "HKG - Hong Kong",
        "label": "Hong Kong"
    },
    {
        "value": "HUN - Hungary",
        "label": "Hungary"
    },
    {
        "value": "ISL - Iceland",
        "label": "Iceland"
    },
    {
        "value": "IND - India",
        "label": "India"
    },
    {
        "value": "IDN - Indonesia",
        "label": "Indonesia"
    },
    {
        "value": "IRN - Iran",
        "label": "Iran"
    },
    {
        "value": "IRQ - Iraq",
        "label": "Iraq"
    },
    {
        "value": "IRL - Ireland (Rep. Of)",
        "label": "Ireland (Rep. Of)"
    },
    {
        "value": "IMN - sle of Man",
        "label": "Isle of Man"
    },
    {
        "value": "ISR - Israel",
        "label": "Israel"
    },
    {
        "value": "ITA - Italy",
        "label": "Italy"
    },
    {
        "value": "CIV - Ivory Coast",
        "label": "Ivory Coast"
    },
    {
        "value": "JAM - Jamaica",
        "label": "Jamaica"
    },
    {
        "value": "JPN - Japan",
        "label": "Japan"
    },
    {
        "value": "JEY - Jersey",
        "label": "Jersey"
    },
    {
        "value": "JOR - Jordan",
        "label": "Jordan"
    },
    {
        "value": "KAZ - Kazakhstan",
        "label": "Kazakhstan"
    },
    {
        "value": "KEN - Kenya",
        "label": "Kenya"
    },
    {
        "value": "KIR - Kiribati",
        "label": "Kiribati"
    },
    {
        "value": "PRK - Korea (North)",
        "label": "Korea (North)"
    },
    {
        "value": "KOR - Korea (South)",
        "label": "Korea (South)"
    },
    {
        "value": "KWT - Kuwait",
        "label": "Kuwait"
    },
    {
        "value": "KGZ - Kyrgyzstan",
        "label": "Kyrgyzstan"
    },
    {
        "value": "LAO - Laos",
        "label": "Laos"
    },
    {
        "value": "LVA - Latvia",
        "label": "Latvia"
    },
    {
        "value": "LBN - Lebano",
        "label": "Lebanon"
    },
    {
        "value": "LSO - Lesotho",
        "label": "Lesotho"
    },
    {
        "value": "LBR - Liberia",
        "label": "Liberia"
    },
    {
        "value": "LBY - Libya",
        "label": "Libya"
    },
    {
        "value": "LIE - Liechtenstein",
        "label": "Liechtenstein"
    },
    {
        "value": "LTU - Lithuania",
        "label": "Lithuania"
    },
    {
        "value": "LUX - Luxembourg",
        "label": "Luxembourg"
    },
    {
        "value": "MAC - Macao",
        "label": "Macao"
    },
    {
        "value": "MKD - Macedonia, the Former Yugoslav Republic of",
        "label": "Macedonia, the Former Yugoslav Republic of"
    },
    {
        "value": "MDG - Madagascar",
        "label": "Madagascar"
    },
    {
        "value": "MWI - Malawi",
        "label": "Malawi"
    },
    {
        "value": "MYS - Malaysia",
        "label": "Malaysia"
    },
    {
        "value": "MDV - Maldives",
        "label": "Maldives"
    },
    {
        "value": "MLI - Mali",
        "label": "Mali"
    },
    {
        "value": "MLT - Malta",
        "label": "Malta"
    },
    {
        "value": "MHL - Marshall Islands",
        "label": "Marshall Islands"
    },
    {
        "value": "MTQ - Martinique",
        "label": "Martinique"
    },
    {
        "value": "MRT - Mauritania",
        "label": "Mauritania"
    },
    {
        "value": "MUS - Mauritius",
        "label": "Mauritius"
    },
    {
        "value": "MYT - Mayotte",
        "label": "Mayotte"
    },
    {
        "value": "MEX - Mexico",
        "label": "Mexico"
    },
    {
        "value": "FSM - Micronesia, Federated States of",
        "label": "Micronesia, Federated States of"
    },
    {
        "value": "MDA - Moldova",
        "label": "Moldova"
    },
    {
        "value": "MCO - Monaco",
        "label": "Monaco"
    },
    {
        "value": "MNG - Mongolia",
        "label": "Mongolia"
    },
    {
        "value": "MNE - Montenegro",
        "label": "Montenegro"
    },
    {
        "value": "MSR - Montserrat",
        "label": "Montserrat"
    },
    {
        "value": "MAR - Morocco",
        "label": "Morocco"
    },
    {
        "value": "MOZ - Mozambique",
        "label": "Mozambique"
    },
    {
        "value": "MMR - Myanmar",
        "label": "Myanmar"
    },
    {
        "value": "NAM - Namibia",
        "label": "Namibia"
    },
    {
        "value": "NPL - Nepal",
        "label": "Nepal"
    },
    {
        "value": "NLD - Netherlands",
        "label": "Netherlands"
    },
    {
        "value": "ANT - Netherlands Antilles",
        "label": "Netherlands Antilles"
    },
    {
        "value": "NCL - New Caledonia",
        "label": "New Caledonia"
    },
    {
        "value": "NZL - New Zealand",
        "label": "New Zealand"
    },
    {
        "value": "NIC - Nicaragua",
        "label": "Nicaragua"
    },
    {
        "value": "NER - Niger",
        "label": "Niger"
    },
    {
        "value": "NGA - Nigeria",
        "label": "Nigeria"
    },
    {
        "value": "NIU - Niue",
        "label": "Niue"
    },
    {
        "value": "NFK - Norfolk Island",
        "label": "Norfolk Island"
    },
    {
        "value": "MNP - Northern Mariana Islands",
        "label": "Northern Mariana Islands"
    },
    {
        "value": "NOR - Norway",
        "label": "Norway"
    },
    {
        "value": "OMN - Oman",
        "label": "Oman"
    },
    {
        "value": "PAK - Pakistan",
        "label": "Pakistan"
    },
    {
        "value": "PLW - Palau",
        "label": "Palau"
    },
    {
        "value": "PSE - Palestinian territory",
        "label": "Palestinian territory"
    },
    {
        "value": "PAN - Panama",
        "label": "Panama"
    },
    {
        "value": "PNG - Papua New Guinea",
        "label": "Papua New Guinea"
    },
    {
        "value": "PRY - Paraguay",
        "label": "Paraguay"
    },
    {
        "value": "PER - Peru",
        "label": "Peru"
    },
    {
        "value": "PHL - Philippines",
        "label": "Philippines"
    },
    {
        "value": "PCN - Pitcairn",
        "label": "Pitcairn"
    },
    {
        "value": "POL - Poland",
        "label": "Poland"
    },
    {
        "value": "PRT - Portugal",
        "label": "Portugal"
    },
    {
        "value": "PRI - Puerto Rico",
        "label": "Puerto Rico"
    },
    {
        "value": "QAT - Qatar",
        "label": "Qatar"
    },
    {
        "value": "REU - Reunion",
        "label": "Reunion"
    },
    {
        "value": "ROU - Romania",
        "label": "Romania"
    },
    {
        "value": "RUS - Russia",
        "label": "Russia"
    },
    {
        "value": "RWA - Rwanda",
        "label": "Rwanda"
    },
    {
        "value": "SHN - Saint Helena",
        "label": "Saint Helena"
    },
    {
        "value": "SPM - Saint Pierre and Miquelon",
        "label": "Saint Pierre and Miquelon"
    },
    {
        "value": "SMR - San Marino",
        "label": "San Marino"
    },
    {
        "value": "STP - Sao Tome E Principe",
        "label": "Sao Tome E Principe"
    },
    {
        "value": "SAU - Saudi Arabia",
        "label": "Saudi Arabia"
    },
    {
        "value": "SEN - Senegal",
        "label": "Senegal"
    },
    {
        "value": "SRB - Senegal",
        "label": "Serbia"
    },
    {
        "value": "SYC - Seychelles",
        "label": "Seychelles"
    },
    {
        "value": "SLE - Sierra Leone",
        "label": "Sierra Leone"
    },
    {
        "value": "SGP - Singapore",
        "label": "Singapore"
    },
    {
        "value": "SVK - Slovakia",
        "label": "Slovakia"
    },
    {
        "value": "SVN - Slovenia",
        "label": "Slovenia"
    },
    {
        "value": "SLB - Solomon Islands",
        "label": "Solomon Islands"
    },
    {
        "value": "SOM - Somalia",
        "label": "Somalia"
    },
    {
        "value": "ZAF - South Africa",
        "label": "South Africa"
    },
    {
        "value": "SGS - South Georgia and the South Sandwich Islands",
        "label": "South Georgia and the South Sandwich Islands"
    },
    {
        "value": "ESP - Spain",
        "label": "Spain"
    },
    {
        "value": "LKA - Sri Lanka",
        "label": "Sri Lanka"
    },
    {
        "value": "KNA - St. Kitts And Nevis",
        "label": "St. Kitts And Nevis"
    },
    {
        "value": "LCA - St. Lucia",
        "label": "St. Lucia"
    },
    {
        "value": "VCT - St. Vincent and the Grenadines",
        "label": "St. Vincent and the Grenadines"
    },
    {
        "value": "SDN - Sudan",
        "label": "Sudan"
    },
    {
        "value": "SUR - Suriname",
        "label": "Suriname"
    },
    {
        "value": "SJM - Svalbard and Jan Mayen",
        "label": "Svalbard and Jan Mayen"
    },
    {
        "value": "SWZ - Swaziland",
        "label": "Swaziland"
    },
    {
        "value": "SWE - Sweden",
        "label": "Sweden"
    },
    {
        "value": "CHE - Switzerland",
        "label": "Switzerland"
    },
    {
        "value": "SYR - Syria",
        "label": "Syria"
    },
    {
        "value": "TWN - Taiwan (ROC)",
        "label": "Taiwan (ROC)"
    },
    {
        "value": "TJK - Tajikistan",
        "label": "Tajikistan"
    },
    {
        "value": "TZA - Tanzania",
        "label": "Tanzania"
    },
    {
        "value": "THA - Thailand",
        "label": "Thailand"
    },
    {
        "value": "TLS - Timor-Leste",
        "label": "Timor-Leste"
    },
    {
        "value": "TGO - Togo",
        "label": "Togo"
    },
    {
        "value": "TKL - Togo",
        "label": "Tokelau"
    },
    {
        "value": "TON - Tonga",
        "label": "Tonga"
    },
    {
        "value": "TTO - Trinidad And Tobago",
        "label": "Trinidad And Tobago"
    },
    {
        "value": "TUN - Tunisia",
        "label": "Tunisia"
    },
    {
        "value": "TUR - Turkey",
        "label": "Turkey"
    },
    {
        "value": "TKM - Turkmenistan",
        "label": "Turkmenistan"
    },
    {
        "value": "TCA - Turks and Caicos Islands",
        "label": "Turks and Caicos Islands"
    },
    {
        "value": "TUV - Tuvalu",
        "label": "Tuvalu"
    },
    {
        "value": "VIR - US Virgin Islands",
        "label": "US Virgin Islands"
    },
    {
        "value": "UGA - Uganda",
        "label": "Uganda"
    },
    {
        "value": "UKR - Ukraine",
        "label": "Ukraine"
    },
    {
        "value": "ARE - United Arab Emirates",
        "label": "United Arab Emirates"
    },
    {
        "value": "USA - United States of America",
        "label": "United States of America"
    },
    {
        "value": "URY - Uruguay",
        "label": "Uruguay"
    },
    {
        "value": "UZB - Uzbekistan",
        "label": "Uzbekistan"
    },
    {
        "value": "VUT - Vanuatu",
        "label": "Vanuatu"
    },
    {
        "value": "VEN - Venezuela",
        "label": "Venezuela"
    },
    {
        "value": "VNM - Vietnam",
        "label": "Vietnam"
    },
    {
        "value": "WLF - Wallis and Futuna",
        "label": "Wallis and Futuna"
    },
    {
        "value": "ESH - Western Sahara",
        "label": "Western Sahara"
    },
    {
        "value": "WSM - Western Samoa",
        "label": "Western Samoa"
    },
    {
        "value": "YEM - Yemen",
        "label": "Yemen"
    },
    {
        "value": "ZMB - Zambia",
        "label": "Zambia"
    },
    {
        "value": "ZWE - Zimbabwe",
        "label": "Zimbabwe"
    }
])
  const [user,setUser] = useState({
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    confirmPassword:'',
    visiblePassword:false,
    phone_number:'',
    country:'',
    birthday:'',
    accept_terms:false,
    newsletter:false

  })

  const handleSelectCountry = (data: any) => {
    setUser({ ...user, country: data.value });
  };

  const sendForm = async(e:FormEvent<HTMLFormElement>)=>{
    try{
    e.preventDefault()
    if(!user.firstname) return toast.error("El campo nombre no puede quedar vacio")
      if(!user.lastname) return toast.error("El campo apellido no puede quedar vacio")
    if(!user.accept_terms) return toast.error("Para continuar debes leer los terminos y condiciones")
    if(user.password !== user.confirmPassword){
      return toast.error("Las contraseñas no coinciden")
    }

    if(valuePhone && !isPossiblePhoneNumber(valuePhone)){
      return toast.error("El numero de telefono no es valido")
    }
    const {data,status} = await createAccount({...user, phone_number:valuePhone || '',user:{email:user.email, password:user.password}})
    if(status === 200){
      
    toast.success("Usuario registrado")
    setUser({
      firstname:'',
      lastname:'',
      email:'',
      password:'',
      confirmPassword:'',
      visiblePassword:false,
      phone_number:'',
      country:'',
      birthday:'',
      accept_terms:false,
      newsletter:false
    })

    return changeForm('login')
  }else{
    console.log(data.data)
    toast.warning(data.data.message || 'No se pudo encontrar el usuario')
  }
}catch(e){
  console.log(e)
  toast.warning("No se pudieron validar los datos, verifique")
}
  }

  return (
      <section
        className=" p-3 p-md-2 p-xl-1"
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="container m-auto">
          <div className="row justify-content-center">
            <div className="col-12 col-xxl-11">
              <div
                className="card shadow-sm"
                style={{ background: `rgb(15 20 24 / 95%)`,
                  backdropFilter: 'blur(16px)',
                  color: 'white',
                  maxWidth: '800px',
                  margin: 'auto',
                  borderRadius: '20px'  }}
              >
                <div className="row g-0">
                  <div className="col-12 col-md-12 d-flex align-items-center justify-content-center">
                    <div className="col-12 col-lg-11 col-xl-10">
                      <div className="card-body p-3 p-md-4 p-xl-5">
                        <div className="row">
                          <div className="col-12">
                            <div className="mb-1">
                              <h4
                                className="text-center"
                                style={{ fontWeight: "600", fontSize: "27px" }}
                              >
                                Registro
                              </h4>
                              <p className="text-center">
                                ¡Tan solo abra su cuenta y comience a operar!
                              </p>
                            </div>
                          </div>
                        </div>

                        <form onSubmit={sendForm} style={{ color: "black" }}>
                          <div
                            className="row gy-3 overflow-hidden"
                            style={{ maxWidth: "640px", margin: "auto" }}
                          >
                            <div className="col-12 col-lg-6">
                              <div className="d-flex flex-column-reverse ">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="firstname"
                                  id="firstname"
                                  value={user.firstname}
                                  onChange={(e)=>{setUser({...user,firstname:e.target.value})}}
                                  placeholder="Nombre"
                                  required
                                />
                              </div>
                            </div>

                            <div className="col-12 col-lg-6">
                              <div className="d-flex flex-column-reverse ">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="lastname"
                                  id="lastname"
                                  value={user.lastname}
                                  onChange={(e)=>{setUser({...user,lastname:e.target.value})}}
                                  placeholder="Apellido"
                                  required
                                />
                            
                              </div>
                            </div>

                            <div className="col-12 col-lg-6">
                              <div className="d-flex flex-column-reverse ">
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  id="email"
                                  value={user.email}
                                  onChange={(e)=>{setUser({...user,email:e.target.value})}}
                                  placeholder="Correo"
                                  required
                                />
                            
                              </div>
                            </div>

                            <div className="col-12 col-lg-6">
                              <div className="d-flex flex-column-reverse field-input-phone">
                              
                                <PhoneInput
                                  placeholder="Telefono"
                                  value={valuePhone}
                                  onChange={setValuePhone}/>
                              
                              </div>
                            </div>
                            <div className="col-12">
                            <Select
                              options={listCountries}
                              defaultValue={user.country}
                              styles={selectStylePayments}
                              onChange={(e:any) => {
                                handleSelectCountry(e);
                              }}

                              placeholder={<div>Pais de residencia</div>}
                              theme={(theme) => ({
                                ...theme,
                                borderRadius: 10,
                                colors: {
                                  ...theme.colors,
                                  //after select dropdown option
                                  primary50: "#1c253b",

                                  //Text color
                                  neutral80: "#F4FFFD",
                                },
                              })}
                            />
                            </div>

                            <div className="col-12 col-lg-12">
                              <div className="d-flex flex-column ">
                                <label className="text-white mb-1" style={{fontWeight:'700'}}>Fecha de nacimiento</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="birthday"
                                  id="birthday"
                                  value={user.birthday}
                                  onChange={(e)=>{setUser({...user,birthday:e.target.value})}}
                                  placeholder="birthday"
                                  required
                                />
                            
                              </div>
                            </div>

                            <div className="col-12 col-lg-6">
                              <div className="d-flex flex-column-reverse position-relative">
                                <input
                                  type={user.visiblePassword ? "text" : "password"}
                                  className="form-control"
                                  name="password"
                                  id="password"
                                  style={{paddingRight:'40px'}}
                                  placeholder="Contraseña"
                                  onChange={(e)=>{setUser({...user,password:e.target.value})}}
                                  required
                                />
                             
                                <button className="password-eye" style={{bottom:'6px'}} type="button" onClick={()=>{
                                  setUser({...user,visiblePassword:!user.visiblePassword})
                                  
                                  }}>{user.visiblePassword ? <OpenEye style={{fill:'#000'}}/> : <CloseEye style={{fill:'#000'}}/>}</button>
                              </div>
                            </div>

                            <div className="col-12 col-lg-6">
                              <div className="d-flex flex-column-reverse position-relative">
                                <input
                                  type="password"
                                  className="form-control"
                                  name="passwordConfirm"
                                  id="passwordConfirm"
                                  value={user.confirmPassword}
                                  onChange={(e)=>{setUser({...user,confirmPassword:e.target.value})}}
                                  placeholder="Confirmar contraseña"
                                  required
                                />
                               
                              </div>
                            </div>

                            <div className="col-12">
                                  <div className="d-flex align-items-start gap-2"><input style={{marginTop:'5px'}} type="checkbox" id="checkconfirm" checked={user.accept_terms} onChange={(e)=>{setUser({...user,accept_terms:e.target.checked})}}/> <label className="text-white m-0" htmlFor="checkconfirm" style={{fontSize:'14px'}}>Confirmo que he leido y aceptado los terminos y condiciones</label></div>
                                  <div className="d-flex align-items-start gap-2"><input style={{marginTop:'5px'}} type="checkbox" id="checkconfirmnewsletter" checked={user.newsletter} onChange={(e)=>{setUser({...user,newsletter:e.target.checked})}}/> <label className="text-white m-0" htmlFor="checkconfirmnewsletter" style={{fontSize:'14px'}}>Deseo recibir actualizaciones y noticias del broker</label></div>
                              <div className="d-flex flex-column align-items-center justify-content-center">
                                <button
                                  className="btn btn-primary btn-lg w-100 mt-4"
                                  style={{
                                    fontWeight: "600",
                                    fontSize: "16px",
                                  }}
                                  type="submit"
                                >
                                  Registrarse
                                </button>
                                <div className="text-white d-flex align-items-center gap-3 mt-4 flex-wrap justify-conent-center ">
                                  <p className="text-center w-100" style={{ color: "#b3b3b3" }}>
                                    ¿Ya tienes una cuenta?
                                  </p>
                                  <button
                                    className="btn btn-dark btn-lg  m-auto"
                                    type="button"
                                    onClick={()=>{changeForm("login")}}
                                    style={{ fontSize: "14px" }}
                                  >
                                    Iniciar Sesion
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};
export default Register;
