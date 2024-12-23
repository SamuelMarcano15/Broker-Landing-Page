import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { UserData, Withdraw } from "../../types";
import 'react-phone-number-input/style.css'
import PhoneInput, {isPossiblePhoneNumber} from 'react-phone-number-input'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Select, { components } from "react-select";
import { blockUserAdmin, createUserAdmin, updateUser, updateUserAdmin } from "../API/UserApi";
interface Props{
    show:boolean,
    handleClose:()=>void,
    onEdit:boolean,
    create:boolean,
    admin:boolean,
    userData:UserData | null
}




const ModalEditUser = ({show,handleClose,onEdit,userData,create,admin}:Props) =>{
    type E164Number = string; // Define E164Number type as needed
    const [selectedCountry, setSelectedCountry] = useState({value:'',label:''})
    const [amountReal,setAmountReal] = useState(0)
    const numberPattern = /^(\d+|\d+\.\d{1,2})$/; // Matches whole numbers or decimals up to two decimal places
    const selectStylePayments = {
        control: (provided: any, state: any) => ({
          ...provided,
          background: "#474e61",
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
            background: state.isFocused ? "#212529" : '#474e61',
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
    const [user,setUser]=useState({
        created_at: '',
        firstname: '',
        lastname: '',
        email: '',
        birthday: '',
        country: '',
        updated_at: '',
        user_id: '',
        balance_real: '',
        phone_number: '',
        balance_demo: '',
        last_connection: '',
        accept_terms: true,
        account_mode: 0,
        role: '',
        block:false,
        new_password:'',
        repeat_password:'',
        check:false,
        newsletter: true,
        deposits: false,
        deposits_total: 0
    })

    const handleSelectCountry = (data: any) => {
        setUser({ ...user, country: data.value });
        setSelectedCountry(data)
      };

    const blockUser = async ()=>{
            withReactContent(Swal).fire({
                title: <b>{`¿Estas seguro de ${user.block ? 'desbloquear' : 'bloquear'} al usuario?`}</b>,
                showConfirmButton:true,
                showDenyButton: true,
                confirmButtonText: `${user.block ? "Desbloquear" : "Bloquear"}`,
                denyButtonText: `Cancelar`
                
              }).then(async(res)=>{
                if(res.isConfirmed){
                    const {data,status} = await blockUserAdmin({user_block:!user.block},user.user_id)
                    console.log('THE DATA',data)
                    if(status === 200){
                        Swal.fire({
                            title: `Usuario ${user.block ? 'desbloqueado' : 'bloqueado'} `,
                            text:`Usuario ${user.block ? 'desbloquear' : 'bloquear'}  con exito`,
                            icon: "success"
                        });

                        return handleClose()
                    }else{
                        Swal.fire({
                            title: "Error",
                            text:"Error al ejecutar accion",
                            icon: "error"
                        });
                    }
                }
              })
    }
    const handleRol = (e:any) =>{
        const {value} = e.target
        setUser({...user,role:value})
    }

    type TransactionStates = {
        approved: string;
        reject: string;
        pending: string;
        waiting:string;
      };

      const STATES_TRANSACTIONS:TransactionStates = {
        approved: "Aprobado",
        reject: "Rechazado",
        waiting:"En espera",
        pending: "En espera",
      };



    useEffect(()=>{
        if(userData && show){
            console.log(userData)
            setUser({
                created_at: userData.created_at,
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                birthday: userData.birthday,
                country: userData.country,
                updated_at: userData.updated_at,
                user_id: userData.user_id,
                balance_real: userData.balance_real,
                phone_number: userData.phone_number,
                balance_demo: userData.balance_demo,
                last_connection: userData.last_connection,
                accept_terms: userData.accept_terms,
                account_mode: 0,
                role: 'user',
                new_password:'',
                repeat_password:'',
                check:false,
                newsletter: userData.newsletter,
                deposits: false,
                block:userData.block,
                deposits_total: 0
            })

            setAmountReal(Number(userData.balance_real))
            const selectedCountryFilter = listCountries.filter((el)=>{
                if(el.value.toLowerCase().trim() === userData.country.toLowerCase().trim()){
                    return el
                }
            })


            console.log('selected', selectedCountryFilter)
            if(selectedCountryFilter){
                setSelectedCountry(selectedCountryFilter[0])
            }
            setValuePhone(userData.phone_number)
        }
    },[userData,show])

    const handleForm = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const sendUser = {...user,phone_number:valuePhone, password:user.new_password}
        //Create user
        if(create && admin){
            if(!user.firstname){
                return toast.error("El nombre no puede estar vacio")
            }
    
            if(!user.lastname){
                return toast.error("El apellido no puede quedar vacio")
            }
    
            if(!user.email){
                return toast.error("El email no puede quedar vacio")
            }

            if(!user.new_password || user.new_password !== user.repeat_password ){
                return toast.error("Las contraseñas no coinciden")
            }
            withReactContent(Swal).fire({
                title: <b>{'¿Estas seguro de crear al usuario?'}</b>,
                showConfirmButton:true,
                showDenyButton: true,
                confirmButtonText: "Crear",
                denyButtonText: `Cancelar`
                
              }).then(async(res)=>{
                if(res.isConfirmed){
                    const {data,status} = await createUserAdmin(sendUser)
                    if(status === 200){
                        Swal.fire({
                            title: "Usuario creado",
                            text:"Usuario creado con exito",
                            icon: "success"
                        });

                        return handleClose()
                    }else{
                        Swal.fire({
                            title: "Error",
                            text:`${data.message || "Ocurrio un error al crear al usuario"}`,
                            icon: "error"
                        });
                    }
                }
              })
        }

        //Change if not admin
        if(onEdit){
        if(!user.firstname){
            return toast.error("El nombre no puede estar vacio")
        }

        if(!user.lastname){
            return toast.error("El apellido no puede quedar vacio")
        }

        if(!user.email){
            return toast.error("El email no puede quedar vacio")
        }
        if(valuePhone && !isPossiblePhoneNumber(valuePhone)){
            return toast.error("El numero de telefono no es valido")
          }

        withReactContent(Swal).fire({
            title: <b>{'¿Estas seguro de actualizar los datos?'}</b>,
            showConfirmButton:true,
            showDenyButton: true,
            confirmButtonText: "Actualizar",
            denyButtonText: `Cancelar`
            
          }).then(async(res)=>{
            if(res.isConfirmed){
            if(Cookies.get('role') !== "admin" ){
                ///fetch to change user normal
                const dataUser = {
                    token: Cookies.get('token'),
                    new_email: user.email,
                    new_password: user.new_password,
                    repeat_password: user.repeat_password,
                    check: user.check,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    phone_number: valuePhone || '',
                    newsletter: user.newsletter
                }
                const {data,status} = await updateUser({...dataUser},user.user_id || '')
                console.log(data)

                if(status === 200){
                    Swal.fire({
                        title: "Actualizado",
                        text:"Informacion actualizada con exito",
                        icon: "success"
                    });
                    handleClose()
                }else{
                    Swal.fire({
                        title: "Error",
                        text:`${data.message || "Ocurrio un error al actualizar"}`,
                        icon: "error"
                    });
                }
            }

            if(Cookies.get('role') === "admin" ){
                const dataUser = {
                    token: Cookies.get("token"),
                    new_email: user.email,
                    new_password: user.new_password,
                    check: user.check,
                    new_balance_real: String(amountReal),
                    new_role: user.role,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    birthday: user.birthday,
                    country: user.country,
                    phone_number: valuePhone || '',
                    newsletter: user.newsletter
                }

                const {data,status} = await updateUserAdmin({...dataUser},user.user_id || '')
                console.log('DATA CHANGE', data)
                if(status === 200){
                    Swal.fire({
                        title: "Actualizado",
                        text:"Informacion actualizada con exito",
                        icon: "success"
                    });
                    handleClose()
                }else{
                    Swal.fire({
                        title: "Error",
                        text:"Ocurrio un error al actualizar",
                        icon: "error"
                    });
                }
            }

                
                console.log(user)
            }
          })

        }
    }

  
    return(
        <Modal show={show} onHide={handleClose} className="form-modal-asset form-user-modal">
        <Modal.Header closeButton>
          <Modal.Title>{create ? 'Creacion de usuario' : 'Informacion de usuario'}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{color:'white'}}>
                <form onSubmit={handleForm}>
                <div className="row">
                    <div className="col-lg-6 mt-2 mt-lg-0">
                        <label className="form-label m-0">Nombre</label>
                        <input className="form-control" type="text" placeholder="Nombre" value={user.firstname} onChange={(e)=>{setUser({...user,firstname:e.target.value})}} />
                    </div>
                    <div className="col-lg-6 mt-2 mt-lg-0">
                        <label className="form-label m-0">Apellido</label>
                        <input className="form-control" type="text" placeholder="Apellido" onChange={(e)=>{setUser({...user,lastname:e.target.value})}}  value={user.lastname}/>
                    </div>
                </div>

                <div className="row mt-lg-3">
                    <div className="col-lg-6 mt-2 mt-lg-0 col-12">
                        <label className="form-label m-0">Email</label>
                        <input className="form-control" type="email" placeholder="Email" onChange={(e)=>{setUser({...user,email:e.target.value})}} value={user.email}/>
                    </div>
                    <div className="col-lg-6 mt-2 mt-lg-0">
                        <label className="form-label m-0">Fecha de nacimiento</label>
                        {admin ? <input className="form-control" type="date" placeholder="Fecha" value={user.birthday} onChange={(e)=>{setUser({...user,birthday:e.target.value})}}/> : <input className="form-control" type="text" placeholder="Fecha" value={user.birthday} disabled/>}
                    </div>
                </div>

                <div className="row mt-lg-3 mt-3">
                <label className="form-label m-0">Pais de residencia</label>
                {Cookies.get("role") === "admin" ?<Select
                              options={listCountries}
                              value={selectedCountry}
                              styles={selectStylePayments}
                              onChange={(e:any) => {
                                handleSelectCountry(e);
                              }}

                              placeholder={<div>Seleccione pais</div>}
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
                            /> : <div className="d-flex flex-column"><p>{selectedCountry?.value || ''}</p></div>}
                </div>

                {Cookies.get("role") === "admin" && onEdit ? 
                <div className="row mt-lg-3 mt-1">
                    <div className="col-lg-12 mt-2 mt-lg-0 col-12">
                        <label className="form-label m-0">Rol del usuario</label>
                        <select id="role-select" value={user.role} className="form-control" onChange={(e)=>{handleRol(e)}}>
                            <option value="user">Usuario</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>
             

                    <div className="col-lg-12 mt-2 mt-lg-3 col-12">
                        <label className="form-label m-0">Balance real del usuario</label>
                        <input className="form-control" type="number" value={amountReal}
              onKeyDown={(evt) =>
                ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
              }
              onChange={(e) => {
                const value = e.target.value;

                // Validate the input
                if (value === "") {
                    setAmountReal(1); // Set to 1 if input is empty
                } else {
                  const value = e.target.value;
                  // Validate the input against the regex pattern
                  if (numberPattern.test(value) || value === '') {
                    setAmountReal(parseFloat(value));
                  }
                }
              }} />
                    </div>
             
                </div> 
                : ''}

                <div className="row mt-lg-3">
                    <div className="col-lg-12 col-12 mt-2 mt-lg-0">
                        <label className="form-label mb-0">Numero de telefono</label>
                        <div className="container-field-phone"> <PhoneInput
                                  placeholder="Telefono"
                                  value={valuePhone}
                                  onChange={setValuePhone}/></div>
                    </div>
                </div>
                    <div className="d-flex flex-column">
                    {!create ? <div className="col-lg-12 col-12 mt-2">
                        <div className="d-flex flex-wrap gap-2"><input type="checkbox" id="passwordcheck" onChange={((e)=>{setUser({...user,check:!user.check})})} checked={user.check}/> <label htmlFor="passwordcheck">Realizar cambio de contraseña</label></div>
                    </div> : ''}
                   { user.check || create && Cookies.get("role") === "admin" ? <>
                    <div className="col-lg-12 col-12 mt-2">
                        <label className="form-label m-0">{create ? 'Contraseña' : 'Nueva Contraseña'}</label>
                        <input className="form-control" type="text" placeholder="Contraseña" onChange={(e)=>{setUser({...user,new_password:e.target.value})}}  value={user.new_password}/>
                    </div>
                    <div className="col-lg-12 col-12 mt-2">
                        <label className="form-label m-0">Confirmar contraseña</label>
                        <input className="form-control" type="password" placeholder="Confirmar Contraseña" onChange={(e)=>{setUser({...user,repeat_password:e.target.value})}}  value={user.repeat_password}/>
                    </div>
                    </>:''}
                    </div>


                    {
                        create && Cookies.get("role") === "admin" ? <div className="col-lg-12 col-12 mt-2">
                        <label htmlFor="role-select" className="form-label m-0">Rol</label>
                        <select id="role-select" value={user.role} className="form-control" onChange={(e)=>{handleRol(e)}}>
                            <option value="user">Usuario</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div> : ''
                    }

                    

                  

                   {!create ? <div className="col-lg-12 col-12 mt-2">
                        <div className="d-flex align-items-start gap-2"><input type="checkbox" style={{marginTop:'4px'}} id="news" onChange={((e)=>{setUser({...user,newsletter:!user.newsletter})})} checked={user.newsletter}/> <label htmlFor="news">Deseo recibir actualizaciones y noticias del broker</label></div>
                    </div> : ''}

               

                <button type="submit" className="btn btn-primary m-auto mt-3 w-100">{create ? 'Crear usuario' : 'Actualizar datos'}</button>
                {Cookies.get("role") === "admin" ? <button type="button" onClick={()=>{blockUser()}} className="btn btn-secondary m-auto mt-3 w-100">{user.block ? 'Desbloquear' : 'Bloquear'}</button> : ''}
                </form>
         

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{width:'100%'}}>
            Cerrar
          </Button>
          
        </Modal.Footer>
      </Modal>
    )
}

export default ModalEditUser