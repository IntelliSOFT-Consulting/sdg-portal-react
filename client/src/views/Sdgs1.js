import React, { useState , useEffect} from "react";
import { Row, Col, Input, Button, Container, Modal, Label } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from "classnames";
import { css } from '@emotion/core';
import CheckboxTree from 'react-checkbox-tree';
import axios from 'axios';

import Header from "../components/sdgsHeader";
import SdgMap from "../visualizations/sdgMap";
import Footer from "../components/footer";
import SdgHighChart from "../visualizations/sdgHighChart";
import LineChart from "../visualizations/lineChart";
import Spinner from "../visualizations/spinner";
import RadarChart from "../visualizations/radarChart";
import IndexMap from "../visualizations/indexMap";
  
function Sdgs1(props) {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;`;
    const Papa = require("papaparse/papaparse.min.js");
    const data = require('../assets/data/globalDatabase.json');
    const countries = require("../assets/data/countries.json");
    const regions = ["North", "West", "Southern", "Central", "East"]
    const [sdgTargets, setSdgTargets] = useState([])
    let years = [2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000];
    let sdgAllYears = [2019]
    const [sdgMapData, setSdgMapData] = useState([]);
    const [sdgChartData, setSdgChartData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [countryLabel,setCountryLabel] = useState('')
    const [country, setCountry] = useState('DZ');
    const [dataSource, setDataSource] = useState('pan');
    const [year, setYear] = useState('2006');
    const [mapChartType, setMapChartType] = useState('map'); 
    const [isLoading, setIsLoading] = useState(false);
    const [toggleModal, setOpenModal] = useState(false);
    const [isChecked, setIsChecked] = useState(["DZ", "AO", "BJ", "BW", "CM", "BI"])
    const isExpanded = ["North", "West", "Southern", "Central", "East"]
    const [regionCountries, setRegionCountries] = useState([])
    const [goalTitle, setGoalTitle] = useState('');
    const keysHardCode = ["1.1 Number of people not in extreme poverty (people)" ,
    "1.1 Number of people living in extreme poverty (people)" ,
    "1.1 Poverty headcount ratio at national poverty lines (% of population)" ,
    "1.2 Poverty headcount ratio at $1.90 a day (2011 PPP) (% of population)" ,
    "1.2 Urban poverty headcount ratio at national poverty lines (% of urban population)" ,
    "1.2 Rural poverty headcount ratio at national poverty lines (% of rural population)" ,
    "1.2 % of urban population below national poverty line" ,
    "1.2 % of rural population below national poverty line" ,
    "1.2 % of total population below national poverty line" ,
    "1.3 Coverage of social insurance programs (% of population)" ,
    "1.3 Adequacy of social insurance programs (% of total welfare of beneficiary households)" ,
    "1.3 Adequacy of unemployment benefits and ALMP (% of total welfare of beneficiary households)" ,
    "1.3 Adequacy of social safety net programs (% of total welfare of beneficiary households)" ,
    "1.4 Clean cooking fuels and technologies (% of population)" ,
    "1.4 Access to electricity (% of population)" ,
    "1.4 Improved water source (% of population)" ,
    "1.4 Improved sanitation facilities (% of population)" ,
    "1.5 Deaths - Exposure to forces of nature - Sex: Both - Age: All Ages (Rate)" ,
    "1.5 Internally displaced persons  new displacement associated with disasters (number of cases)" ,
    "11.5.2 - Direct disaster economic loss  average annual loss - VC_DSR_AALT - USD (US$)" ,
    "11.5.2 - Direct disaster economic loss  average annual loss in relation to global GDP - VC_DSR_AALG - Per 1 000 USD (%)" ,
    "1.5 Disaster risk reduction progress score (1-5 scale 5=best)" ,
    "1.A Health expenditure  public (% of government expenditure) (% of government expenditure)" ,
    "1.A Government expenditure on education  total (% of government expenditure)" ,
    "1.A Net ODA received  (% of central government expense)" ,
    "2.1 Severely food insecure (number) (people)" ,
    "2.1 Severely food insecure (prevalence) (%)" ,
    "2.1 Moderately food insecure (prevalence) (%)" ,
    "2.1 Prevalence of undernourishment (% of population)" ,
    "2.2 Prevalence of stunting  height for age (% of children under 5)" ,
    "2.2  Share of children with weight too low for their height (wasting) (% of children under 5)" ,
    "2.2.2 - Proportion of overweight children (weight for height above plus two standard deviations from the median) under the age of 5 years - SN_STA_OVWGT - Percent (%)" ,
    "2.2  Prevalence of anemia in pregnant women (1995-2011) (%)" ,
    "2.2  Prevalence of anemia in women of reproductive age (% of women ages 15-49)" ,
    "2.2 Prevalence of anemia in children (% of children under 5)" ,
    "2.2  Prevalence of vitamin A deficiency in pregnant women (%)" ,
    "2.2 Prevalence of vitamin-A deficiency in children (WHO (2017)) (%)" ,
    "2.2 Prevalence of night blindness in pregnant women (WHO (2009)) (%)" ,
    "2.2  Prevalence of night blindness in pre school children (%)" ,
    "2.4 Total agricultural area (hectares)" ,
    "2.4 Organic agricultural area (hectares)" ,
    "2.4 Organic arable area (hectares)" ,
    "2.4 Total arable area (hectares)" ,
    "2.4 Share of arable land which is organic (%)" ,
    "2.5.1 - Number of accessions of plant genetic resources secured in conservation facilities under medium or long term conditions - ER_GRF_PLNTSTOR - Number (accessions in conservation facilities)" ,
    "2.5.1 - Proportion of animal breeds for which sufficient genetic resources for food and agriculture are stored for reconstitution in either medium or long-term conservation facilities - ER_GRF_ANIMRCNT - Percent (%)" ,
    "2.5.2 - Proportion of local breeds classified as being at risk of extinction - ER_NRK_lrED - Percent (%)" ,
    "2.A Credit to Agriculture: Credit to Agriculture  Forestry and Fishing - Agriculture orientation index (FAO (2017)) (index)" ,
    "2.A.2 - Total official flows disbursements for agriculture  by recipient (constant 2015 US$)" ,
    "2.C Suite of Food Security Indicators: Domestic food price volatility (index) - Value (FAO (2017)) (index)" ,
    "3.1 Maternal Mortality Ratio (Gapminder (2010) and World Bank (2015)) (deaths per 100 000 live births)" ,
    "3.1 Number of maternal deaths" ,
    "3.1 birth-attended-health-staff" ,
    "3.2 Mortality rate  neonatal (per 1 000 live births)" ,
    "3.2 Number of neonatal deaths" ,
    "3.2 Child mortality rate (per 1 000 live births)" ,
    "3.2 Child mortality rate of boys (per 1 000 live births) (per 1 000 live births)" ,
    "3.2 Child mortality rate of girls (per 1 000 births) (per 1 000 live births)",
    "3.2 Child mortality rate of total population (Gapminder)" ,
    "3.2 Number of under-five deaths" ,
    "3.3 Incidence of HIV (% of uninfected population ages 15-49) (per 1 000 uninfected individuals aged 15-49)" ,
    "3.3 Under 5 years (deaths from HIV)" ,
    "3.3 70+ years (deaths from HIV)" ,
    "3.3 5-14 years (deaths from HIV)" ,
    "3.3 15-49 years (deaths from HIV)" ,
    "3.3 50-69 years (deaths from HIV)" ,
    "3.3 Incidence of tuberculosis (per 100 000 people)" ,
    "3.3 Under-5s (deaths from tuberculosis)" ,
    "3.3 5-14 years old (deaths from tuberculosis)" ,
    "3.3 15-49 years old (deaths from tuberculosis)" ,
    "3.3 50-69 years old (deaths from tuberculosis)" ,
    "3.3 70+ years old (deaths from tuberculosis)" ,
    "3.3 Incidence of malaria (per 1 000 population at risk)" ,
    "3.3 Under-5s (deaths from malaria)" ,
    "3.3 5-14 years old (deaths from malaria)" ,
    "3.3 15-49 years old (deaths from malaria)" ,
    "3.3 50-69 years old (deaths from malaria)" ,
    "3.3 70+ years old (deaths from malaria)" ,
    "3.3 Deaths from heptatitis (per 100 000 people)" ,
    "3.3 Number of people requiring treatment for neglected tropical diseases (people requiring treatment)" ,
    "3.4 Mortality from CVD  cancer  diabetes or CRD between exact ages 30 and 70 (%)" ,
    "3.4 Suicide mortality rate (per 100 000 population) (per 100 000 population)" ,
    "3.4 Prevalence of depressive disorders  total population (%)" ,
    "3.5 Alcohol consumption (litres per capita) (liters of pure alcohol  projected estimates  15+ years of age)" ,
    "3.5 Alcohol use disorders - both sexes (percent) (%)" ,
    "3.5 Drug use disorders - both sexes (percent) (%)" ,
    "3.6 Deaths - Road injuries (deaths per 100 000 individuals)" ,
    "3.6 road deaths - pedestrians (deaths)" ,
    "3.6 road deaths - Cyclists (deaths)" ,
    "3.6 road deaths - Other road injuries (deaths)" ,
    "3.6 road deaths - Motorcyclists (deaths)" ,
    "3.6 road deaths - Motor vehicles (drivers & passengers) (deaths)" ,
    "3.7 Demand for family planning satisfied by modern methods (% of married women with demand for family planning)" ,
    "3.7 Adolescent fertility rate (births per 1 000 women ages 15-19)" ,
    "3.8 Healthcare Access and Quality Index (IHME (2017)) ((0 to 100))" ,
    "3.8 Out-of-pocket health expenditure (% of total expenditure on health)" ,
    "3.8 Risk of catastrophic expenditure for surgical care (% of people at risk)" ,
    "3.9 Death rate from ozone (per 100 000)" ,
    "3.9 Death rate from ambient particulate matter (per 100 000 people)" ,
    "3.9 Death rate from indoor solid fuels (per 100 000 people)" ,
    "3.9 Death rate from ambient particulate air pollution per 100 000" ,
    "3.9 Outdoor air pollution deaths" ,
    "3.9 Air pollution death rates (indoor solid fuels) per 100 000- IHME (per 100 000 people)" ,
    "3.9 Deaths from household air pollution" ,
    "3.9 Deaths - Unsafe water source (Rate)" ,
    "3.9 Deaths - Unsafe sanitation (Rate) (per 100 000 individuals)" ,
    "3.A Share of adult men who are smoking (%)" ,
    "3.A Share of adult women who are smoking (%)" ,
    "3.A Deaths - Smoking (deaths per 100 000)" ,
    "3.A Smoking (deaths)" ,
    "3.A Secondhand smoke (deaths)" ,
    "3.B Share of children immunized against Diphtheria Tetanus  and Pertussis (DTP3)  2015 (12-23 months) (World Bank (WDI) (2016)) (%)" ,
    "3.B Immunization rate against measles (% of children ages 12-23 months) (World Bank (WDI) (2016)) (%)" ,
    "3.B Total gross official disbursements for medical research and basic heath sectors (constant 2015 US$)" ,
    "3.C Nurses and midwives (per 1 000 people) (per 1 000 people)" ,
    "3.C Specialist surgical workforce (per 100 000 population)" ,
    "3.C Physicians (per 1 000 people)" ,
    "4.1 Existence of nationally representative learning assessment at the end of primary education (GEM Report (2017/18))" ,
    "4.1 Percentage of pupils in early primary education grades (2 or 3) achieving at least a minimum proficiency level in reading (GEM Report (2017/8)) (%)" ,
    "4.1 Percentage of pupils in early primary education grades (2 or 3) achieving at least a minimum proficiency level in mathematics (GEM Report (2017/8)) (%)" ,
    "4.1 Percentage of pupils at end of primary education achieving at least a minimum proficiency level in reading (GEM Report (2017/8)) (%)" ,
    "4.1 Percentage of pupils at end of primary education achieving at least a minimum proficiency level in mathematics (GEM Report (2017/8)) (%)" ,
    "4.1 Percentage of students at end of lower secondary education achieving minimum proficiency in reading (%)" ,
    "4.2 Proportion of children under 5 years of age who are developmentally on track (% of under-5s)" ,
    "4.2 Net enrolment rate  pre-primary  both sexes (%)" ,
    "4.2 Net enrolment rate  pre-primary  boys (%)" ,
    "4.2 Net enrolment rate  pre-primary  girls (%)" ,
    "4.4 Proportion of youth and adults with ICT skills in using presentation software  2015 (%)" ,
    "4.4 Share of males with ICT skills (%)" ,
    "4.4 Share of females with ICT skills (%)" ,
    "4.5 Percentage of students in pre-primary education who are female (%)",
    "Total population (Gapminder)" ,
    "4.5 School life expectancy  pre-primary  female (years)" ,
    "4.5 School life expectancy  pre-primary  male (years)" ,
    "4.5 Out-of-school children of primary school age  both sexes (number)" ,
    "4.5 Total net enrolment rate  primary  both sexes (%)" ,
    "4.5 Total net enrolment rate  primary  gender parity index (GPI)" ,
    "4.5 School life expectancy  primary  gender parity index (GPI)" ,
    "4.5 Primary completion rate  gender parity index (GPI)" ,
    "4.5 School life expectancy  secondary  male (years)" ,
    "4.5 School life expectancy  secondary  female (years)" ,
    "4.6 Youth literacy rate  population 15-24 years  male (%)" ,
    "4.6 Youth literacy rate  population 15-24 years  female (%)" ,
    "4.6 Adult literacy rate  population 15+ years  male (%)" ,
    "4.6 Adult literacy rate  population 15+ years  female (%) (%)" ,
    "4.B Gross disbursements of total ODA for scholarships (constant 2015 US$)" ,
    "4.C Percentage of teachers in pre-primary education who are qualified  both sexes (%)" ,
    "4.C Percentage of teachers in primary education who are qualified  both sexes (%)" ,
    "4.C Percentage of teachers in lower secondary education who are qualified  both sexes (%) (%)" ,
    "4.C Percentage of teachers in upper secondary education who are qualified  both sexes (%)" ,
    "5.1 Universal suffrage to women (OWID based on Paxton et al (2006))" ,
    "5.1 Law mandates nondiscrimination based on gender in hiring (1=yes  0=no)" ,
    "5.1 Law mandates equal remuneration for females and males for work of equal value (1=yes  0=no)" ,
    "5.1 Legislation explicitly criminalizes marital rape (1=yes 0=no)" ,
    "5.1 Married men and married women have equal ownership rights to property (1=yes  0=no)" ,
    "5.1 Married women are required by law to obey their husbands (1=yes  0=no)" ,
    "5.1 Law mandates paid or unpaid maternity leave (1=yes  0=no)" ,
    "5.1 Nondiscrimination clause mentions gender in the constitution (1=yes  0=no)" ,
    "5.1 Woman's testimony carries the same evidentiary weight in court as a man's (1=yes 0=no)" ,
    "5.2 Proportion of women subjected to physical and/or sexual violence in the last 12 months (% of women age 15-49)" ,
    "5.3 Women who were first married by age 18 (% of women ages 20-24)" ,
    "5.3 Female genital mutilation prevalence (%)" ,
    "5.4 Daily time spent on domestic work  women (UN (2017)) (Daily hours)" ,
    "5.4 Time spent in domestic work  female (hours)" ,
    "5.4 Time spent in domestic work  male (hours)" ,
    "5.5 First women in parliament (OWID based on Paxton et al (2006))" ,
    "5.5 Proportion of seats held by women in national parliaments (%)" ,
    "5.5 Proportion of women in ministerial level positions (%)" ,
    "5.5 Firms with female top manager (% of firms)",
    "5.5 Female share of employment in senior and middle management (%)" ,
    "5.6 Decision maker about a woman's own health care: mainly wife (% of women age 15-49)" ,
    "5.6 Contraceptive prevalence  any methods (% of women ages 15-49)" ,
    "5.6 Contraceptive prevalence  modern methods (% of women ages 15-49)" ,
    "5.6 Unmet need for contraception (% of married women ages 15-49)" ,
    "5.B proportion of individuals who own a mobile phone  Female (%)" ,
    "5.B proportion of individuals who own a mobile phone  Both sexes (%)" ,
    "5.B proportion of individuals who own a mobile phone  Male (%)" ,
    "Total population (Gapminder)__1" ,
    "6.1 Drinking water - Proportion of population using improved water supplies - Safely managed - National - Percent (%)" ,
    "6.1 Share of urban population with a safely managed water drinking source (%)" ,
    "6.1 Share of rural population with a safely managed water drinking source (%)" ,
    "6.1 Drinking water - Proportion of population using improved water supplies - Safely managed - National - Population (People)" ,
    "6.1 Drinking water - At least basic - National - Percent (%)" ,
    "6.1 Share of urban population using at least basic drinking water (%)" ,
    "6.1 Share of rural population using at least basic drinking water (%)" ,
    "6.1 Drinking water - At least basic - National - Population (people)" ,
    "6.1 Drinking water service coverage - Unimproved (people)" ,
    "6.1 Drinking water service coverage - At least basic (people)" ,
    "6.1 Drinking water service coverage - Surface water (people)" ,
    "6.1 Drinking water service coverage - Limited (people)" ,
    "6.1 Urban drinking water service coverage - Unimproved (people)" ,
    "6.1 Urban drinking water service coverage - At least basic (people)" ,
    "6.1 Urban drinking water service coverage - Surface water (people)" ,
    "6.1 Urban drinking water service coverage - Limited (people)" ,
    "6.1 Urban drinking water service coverage - Surface water (people)__1" ,
    "6.1 Urban drinking water service coverage - At least basic (people)__1" ,
    "6.1 Urban drinking water service coverage - Unimproved (people)__1" ,
    "6.1 Urban drinking water service coverage - Limited (people)__1" ,
    "6.2 Sanitation - Proportion of population using improved sanitation facilities (excluding shared) - Safely managed - National - Percent (%)" ,
    "6.2 Share of urban population with safely managed sanitation (%)" ,
    "6.2 Share of rural population with safely managed sanitation (%)" ,
    "6.2 Sanitation - Proportion of population using improved sanitation facilities (excluding shared) - Safely managed - National - Population (people)" ,
    "6.2 Sanitation - At least basic - National - Percent (%)" ,
    "6.2 Share of urban population using at least basic sanitation (%)" ,
    "6.2 Share of rural population using at least basic sanitation (%)" ,
    "6.2 Sanitation - At least basic - National - Population (People)" ,
    "6.2 sanitation facilities coverage - Unimproved (people)" ,
    "6.2 sanitation facilities coverage - At least basic (people)" ,
    "6.2 sanitation facilities coverage - Open defecation (people)" ,
    "6.2 sanitation facilities coverage - Limited (shared) (people)" ,
    "6.2 sanitation facilities coverage in urban areas  Unimproved (people)" ,
    "6.2 sanitation facilities coverage in urban areas  Limited (shared) (people)" ,
    "6.2 sanitation facilities coverage in urban areas  Open defecation (people)" ,
    "6.2 sanitation facilities coverage in urban areas  At least basic (people)" ,
    "6.2 sanitation facilities coverage in rural areas  At least basic (people)" ,
    "6.2 sanitation facilities coverage in rural areas  Open defecation (people)" ,
    "6.2 sanitation facilities coverage in rural areas  Limited (shared) (people)" ,
    "6.2 sanitation facilities coverage in rural areas  Unimproved (people)" ,
    "6.2.1 - Proportion of population with basic handwashing facilities on premises - SH_SAN_HNDWSH - Total (national level) (%)" ,
    "6.2 Share of population in urban areas with basic handwashing facilities (%)" ,
    "6.2 Share of population in rural areas with basic handwashing facilities (%)" ,
    "6.4 Water productivity  total (constant 2010 US$ GDP per cubic meter of total freshwater withdrawal)" ,
    "6.4 Annual freshwater withdrawals  total (% of internal resources)" ,
    "6.5 Development an dimplementation of national water resource management plans - Developed but not yet implementing (%)" ,
    "6.5 Development an dimplementation of national water resource management plans - Plans not relevant (%)" ,
    "6.5 Development an dimplementation of national water resource management plans - Fully implemented (%)" ,
    "6.5 Development an dimplementation of national water resource management plans - Started implementing (%)" ,
    "6.5 Development an dimplementation of national water resource management plans - Plans under development (%)" ,
    "6.5 Development an dimplementation of national water resource management plans - Advanced stage of implementation (%)" ,
    "6.5 Development an dimplementation of national water resource management plans - Developed but not yet implementing (%)__1" ,
    "6.a.1 - Total official flows for water supply and sanitation  by recipient (constant 2015 US$)" ,
    "7.1 Access to electricity (% of population)" ,
    "7.1 Share of rural populations with electricity access (%)" ,
    "7.1 Share of total population with electricity access (%)" ,
    "7.1 Number of people with access to electricity (total)" ,
    "7.1 Number of people without access to electricity (total)" ,
    "7.1 Power outages in firms in a typical month (number) (outages)" ,
    "7.1 Access to clean fuels and technologies for cooking  (% of population)" ,
    "7.2 Renewable energy consumption (% of total final energy consumption)" ,
    "7.2 World electricity by source - Coal (% of total)" ,
    "7.2 World electricity by source - Nuclear (% of total)" ,
    "7.2 World electricity by source - Natural gas (% of total)" ,
    "7.2 World electricity by source - Oil (% of total)" ,
    "7.2 World electricity by source - Hydroelectric (% of total)" ,
    "7.2 World electricity by source - Other renewables ( excluding hydro) (% of total)" ,
    "7.3 Energy intensity of primary energy (kWh/$2011 PPP GDP)" ,
    "7.3 energy intensities - Final energy (MJ/$)" ,
    "7.3 energy intensity by sector - Primary energy (MJ/$)" ,
    "7.3 energy intensity by sector - Agriculture (MJ/$)" ,
    "7.3 energy intensity by sector - Industry (MJ/$)" ,
    "7.3 energy intensity by sector - Services (MJ/$)" ,
    "8.1 GDP per capita growth (annual %)" ,
    "8.2.1 - Growth rate of real GDP per employed person (%)" ,
    "8.3 Informal employment (% of total non-agricultural employment)" ,
    "8.3 Informal employment by sex  Female (% of total non-agricultural employment)" ,
    "8.3 Informal employment by sex  Male (% of total non-agricultural employment)" ,
    "8.3 informal employment  Both sexes (% of total non-agricultural employment)" ,
    "8.5 Average hourly earnings of employees (constant 2011 PPP $)" ,
    "8.5 Average hourly earnings of employees  men (constant 2011 PPP $)" ,
    "8.5 Average hourly earnings of employees  women (constant 2011 PPP $)" ,
    "8.5 Unemployment  total (% of total labor force) (modeled ILO estimate)" ,
    "8.5 Unemployment  male (% of male labor force modeled ILO estimate)" ,
    "8.5 Unemployment  female (% of female labor force modeled ILO estimate)" ,
    "8.6 Share of youth not in education  employment or training  total (% of youth population)" ,
    "8.7 Children in employment  total (% of children ages 7-14) (% of children ages 7-14)" ,
    "8.7 percentage of children in employment  Male (% of male children ages 7-14)" ,
    "8.7 percentage of children in employment  Female (% of female children ages 7-14)" ,
    "8.7 Average working hours of children  study and work  ages 7-14 (hours per week)" ,
    "8.8.1 - Frequency rates of non-fatal occupational injuries among employees - SL_EMP_INJUR - Both sexes or no breakdown by sex (per 100 000 employees)" ,
    "8.8.1 - Frequency rates of fatal occupational injuries among employees - SL_EMP_FTLINJUR - Both sexes or no breakdown by sex (per 100 000 employees)" ,
    "8.10 Commercial bank branches (per 100 000 adults)" ,
    "8.10 Automated teller machines (ATMs) (per 100 000 adults)" ,
    "8.10 Account at a financial institution (% age 15+) (%)" ,
    "8.10 Registered mobile money accounts (GSMA (2017)) (registered accounts)" ,
    "8.a.1 - Total official flows commitments for Aid for Trade  by recipient - DC_TOF_TRDCML (constant 2015 US$)" ,
    "8.a.1 - Total official flows commitments for Aid for Trade  by donor - DC_TOF_TRDCMDL (constant 2015 US$)" ,
    "9.1 Air transport  passengers carried" ,
    "9.1 Railways  passengers carried (passenger-km)" ,
    "9.1 Air transport  freight (million ton-km)" ,
    "9.2 Manufacturing  value added (% of GDP)" ,
    "9.2 Industry as % of total employment -- ILO modelled estimates  May 2017 (%)" ,
    "9.4 CO2 emissions (kg per 2011 PPP $ of GDP)" ,
    "9.5 Research and development expenditure (% of GDP)" ,
    "9.5 Researchers in R&D (per million people)" ,
    "9.a.1 - Total official flows for infrastructure  by recipient (constant 2015 US$)" ,
    "9.b.1 - Proportion of medium and high-tech industry value added in total value added (%)" ,
    "9.C Mobile cellular subscriptions (per 100 people)" ,
    "9.C Mobile cellular subscriptions total by country" ,
    "9.C Internet Users by World Region" ,
    "9.C Individuals using the Internet (% of population)" ,
    "10.1 Annualized average growth rate in per capita real survey mean consumption or income  bottom 40% of population (%)" ,
    "10.4.1 - Labour share of GDP  comprising wages and social protection transfers (%)" ,
    "10.6 proportion of members of developing countries in international organizations -  UN General Assembly (%)" ,
    "10.6 proportion of members of developing countries in international organizations - UN Security Council (%)" ,
    "10.6 proportion of members of developing countries in international organizations - World Trade Organisation (%)" ,
    "10.6 proportion of members of developing countries in international organizations - Asian Development Bank (%)" ,
    "10.6 proportion of members of developing countries in international organizations - African Development Bank (%)" ,
    "10.6 proportion of members of developing countries in international organizations - Financial Stability Board (%)" ,
    "10.6 proportion of members of developing countries in international organizations -Inter-American Development Bank (%)" ,
    "10.6 proportion of members of developing countries in international organizations - International Monetary Fund (%)" ,
    "10.6 proportion of members of developing countries in international organizations - International Finance Corporation (%)" ,
    "10.6 proportion of members of developing countries in international organizations - UN Economic and Social Council (%)" ,
    "10.6 proportion of members of developing countries in international organizations - International Bank for Reconstruction and Development (%)" ,
    "10.6 proportion of voting rights of developing countries in international organizations - UN Security Council (%)" ,
    "10.6 proportion of voting rights of developing countries in international organizations - UN General Assembly (%)" ,
    "10.6 proportion of voting rights of developing countries in international organizations - World Trade Organisation (%)" ,
    "10.6 proportion of voting rights of developing countries in international organizations - Asian Development Bank (%)" ,
    "10.6 proportion of voting rights of developing countries in international organizations - African Development Bank (%)" ,
    "10.6 proportion of voting rights of developing countries in international organizations - Financial Stability Board (%)" ,
    "10.6 proportion of voting rights of developing countries in international organizations - Inter-American Development Bank (Percent)" ,
    "10.6 proportion of voting rights of developing countries in international organizations - International Monetary Fund (%)" ,
    "10.6 proportion of voting rights of developing countries in international organizations - UN Economic and Social Council (Percent)" ,
    "10.6 proportion of voting rights of developing countries in international organizations - International Finance Corporation (%)" ,
    "10.6 proportion of voting rights of developing countries in international organizations - International Bank for Reconstruction and Development (%)" ,
    "10.b.1 - Total assistance for development  by recipient - DC_TRF_TOTL - USD (US$)" ,
    "10.b.1 - Total assistance for development  by donor - DC_TRF_TOTDL - Constant USD (constant US$)" ,
    "10.c.1 - Remittance costs as a proportion of the amount remitted (%)" ,
    "11.1 Population living in slums (% of urban population)" ,
    "11.5 Natural disasters (deaths)" ,
    "11.5 Deaths - Exposure to forces of nature - Sex: Both - Age: All Ages (Rate)" ,
    "11.5 Internally displaced persons  new displacement associated with disasters (number of cases)" ,
    "11.5.2 - Direct disaster economic loss  average annual loss - VC_DSR_AALT - USD (US$)__1" ,
    "1.5.2 - Direct economic loss attributed to disasters (USD)" ,
    "11.5.2 - Direct disaster economic loss  average annual loss in relation to global GDP - VC_DSR_AALG - Per 1 000 USD (%)__1" ,
    "11.6 PM2.5 air pollution  mean annual exposure (micrograms per cubic meter) (micrograms per cubic meter)" ,
    "11.6.1 - Proportion of population served by municipal waste collection (%)" ,
    "11.b.1 - Number of countries with legislative and/or regulatory provisions been made for managing disaster risk (Number)" ,
    "12.2.1 - Material footprint per capita - EN_MAT_FTPRPC - Metric Tons (metric tons)" ,
    "12.2.1 - Material footprint per unit of GDP - EN_MAT_FTPRPG - Kilograms (kilograms per US$)" ,
    "12.2.2 - Domestic material consumption per capita - EN_MAT_DOMCMPC - Metric Tons (metric tons per capita)" ,
    "12.2.2 - Domestic material consumption per unit of GDP - EN_MAT_DOMCMPG - Kilograms (kilograms per US$)" ,
    "12.4 Parties to multilateal agreements on hazardous waste - Basel Convention (%)" ,
    "12.4 Parties to multilateal agreements on hazardous waste - Montreal Protocol (%)" ,
    "12.4 Parties to multilateal agreements on hazardous waste - Stockholm Convention (%)" ,
    "12.4 Parties to multilateal agreements on hazardous waste - Rotterdam Convention (%)" ,
    "13.1 Deaths - Exposure to forces of nature - Sex: Both - Age: All Ages (Rate)" ,
    "13.1 Natural disasters (deaths)" ,
    "13.1 Internally displaced persons  new displacement associated with disasters (number of cases)" ,
    "13.1 - Number of countries with legislative and/or regulatory provisions been made for managing disaster risk (Number)" ,
    "13.2 Parties to environmental agreements - Cartagena Protocol on Biosafety" ,
    "13.2 Parties to environmental agreements - Convention on Biological Diversity (CBD)" ,
    "13.2 Parties to environmental agreements - Cites Convention on International Trade in Endangered Species of Wild Fauna nad Flora" ,
    "13.2 Parties to environmental agreements - Convention on the Conservation of Migratory Species of Wild Animals" ,
    "13.2 Parties to environmental agreements - World Heritage Convention",
    "13.2 Parties to environmental agreements - Kyoto Protocol",
    "13.2 Parties to environmental agreements - Vienna Convention (Ozone)" ,
    "13.2 Parties to environmental agreements - Ramsar Convention" ,
    "13.2 Parties to environmental agreements - Rotterdam Convention" ,
    "13.2 Parties to environmental agreements - Stockholm Convention on Persistent Organic Pollutants" ,
    "13.2 Parties to environmental agreements - UN Convention to Combat Desertification (UNCCD)" ,
    "13.2 Parties to environmental agreements - UN Convention on the Law of the Sea (UNCLOS)" ,
    "13.2 Parties to environmental agreements - UN Framework Convention on Climate Change (UNFCCC)" ,
    "13.2 Per capita CO‚ÇÇ emissions (Global Carbon Project Gapminder UN) (tonnes per capita)" ,
    "13.2 Annual CO‚ÇÇ emissions (Global Carbon Project (2017)) (million tonnes)" ,
    "13.2 CO2 emissions (kg per 2011 PPP $ of GDP)" ,
    "14.4 fish stocks - Overexploited (%)" ,
    "14.4 fish stocks - Fully exploited (%)" ,
    "14.4 fish stocks - Not fully exploited (%)" ,
    "14.5 Marine protected areas (% of territorial waters)" ,
    "14.5 Fish species  threatened" ,
    "15.1.1 - Forest area as a proportion of total land area - AG_LND_FRST - Percent (%)" ,
    "15.1 Terrestrial protected areas (% of total land area)" ,
    "15.1.2 - Proportion of important sites for terrestrial biodiversity that are covered by protected areas - ER_PTD_TERR (%)" ,
    "15.1.2 - Proportion of important sites for freshwater biodiversity that are covered by protected areas - ER_PTD_FRHWTR (%)" ,
    "15.2.1 - Forest area net change rate - AG_LND_FRSTCHG - Percent (%)" ,
    "15.2.1 - Above-ground biomass in forest per hectare - AG_LND_FRSTBIOPHA - Tonnes per hectare (tonnes per hectare)" ,
    "15.2.1 - Proportion of forest area within legally established protected areas - AG_LND_FRstRCT - Percent (%)" ,
    "15.2.1 - Proportion of forest area with a long-term management plan - AG_LND_FRSTMGT - Percent (%)" ,
    "15.2.1 - Proportion of forest area certified under an independently verified certification scheme - AG_LND_FRSTCERT - Percent (%)" ,
    "15.4.1 - Coverage by protected areas of important sites for mountain biodiversity (%)" ,
    "15.4.2 - Mountain Green Cover Index - ER_MTN_GRNCVI - Percent (%)" ,
    "15.5.1 - Red List Index" ,
    "15.6.1 - Countries that have legislative  administrative and policy framework or measures reported to the Access and Benefit-Sharing Clearing-House - ER_CBD_ABSCLRHS - Not applicable ((1 = Yes, 0 = No))" ,
    "15.6.1 - Countries that are contracting Parties to the International Treaty on Plant Genetic Resources for Food and Agriculture (PGRFA) -  0 = No)) ER_CBD_PTYPGRFA - Not applicable ((1 = Yes" ,
    "15.6.1 - Countries that are parties to the Naoya Protocol - ER_CBD_NaoYA - Not applicable ((1 = Yes" ,
    "15.a.1 - Total official development assistance for biodiversity  by recipient - DC_ODA_BDVL - USD (constant 2015 US$)" ,
    "15.a.1 - Total official development assistance for biodiversity  by donor - DC_ODA_BDVDL - Constant USD (constant 2015 US$)" ,
    "16.1 Intentional homicides (per 100 000 people)" ,
    "16.1 Deaths - Conflict and terrorism - Sex: Both - Age: All Ages (Rate)" ,
    "16.2 Percentage of children who experience any violent discipline (UNICEF Global Databases (2016)) (% children 2-14)" ,
    "16.2 Number of victims of human trafficking per 100 000 (Male)" ,
    "16.2 Number of victims of human trafficking per 100 000 (Female) (per 100 000)" ,
    "16.2 Number of victims of human trafficking per 100 000 (Female)" ,
    "16.2 Number of victims of human trafficking per 100 000 (Male)__1" ,
    "16.2 Proportion of women subjected to physical and/or sexual violence in the last 12 months (% of women age 15-49)" ,
    "16.2 Sexual violence prevalence among girls (15 to 19) (UNICEF Global Databases (2014)) (%)" ,
    "16.3.2 - Unsentenced detainees as a proportion of overall prison population (%)" ,
    "16.5 Bribery incidence (% of firms experiencing at least one bribe payment request)" ,
    "16.8 proportion of developing countries members in international organizations - UN General Assembly (%)" ,
    "16.8 proportion of developing countries members in international organizations - UN Security Council (%)" ,
    "16.8 proportion of developing countries members in international organizations - World Trade Organisation (%)" ,
    "16.8 proportion of developing countries members in international organizations - Asian Development Bank (%)" ,
    "16.8 proportion of developing countries members in international organizations - African Development Bank (%)" ,
    "16.8 proportion of developing countries members in international organizations - Financial Stability Board (%)" ,
    "16.8 proportion of developing countries members in international organizations - Inter-American Development Bank (%)" ,
    "16.8 proportion of developing countries members in international organizations - International Monetary Fund (%)" ,
    "16.8 proportion of developing countries members in international organizations - International Finance Corporation (%)" ,
    "16.8 proportion of developing countries members in international organizations - UN Economic and Social Council (%)" ,
    "16.8 proportion of developing countries members in international organizations - International Bank for Reconstruction and Development (%)" ,
    "16.8 proportion of voting rights for developing countries - UN Security Council (%)" ,
    "16.8 proportion of voting rights for developing countries - UN General Assembly (%)" ,
    "16.8 proportion of voting rights for developing countries - World Trade Organisation (%)" ,
    "16.8 proportion of voting rights for developing countries - Asian Development Bank (%)" ,
    "16.8 proportion of voting rights for developing countries - African Development Bank (%)" ,
    "16.8 proportion of voting rights for developing countries - Financial Stability Board (%)" ,
    "16.8 proportion of voting rights for developing countries - Inter-American Development Bank (Percent)" ,
    "16.8 proportion of voting rights for developing countries - International Monetary Fund (%)" ,
    "16.8 proportion of voting rights for developing countries - UN Economic and Social Council (Percent)" ,
    "16.8 proportion of voting rights for developing countries - International Finance Corporation (%)" ,
    "16.8 proportion of voting rights for developing countries - International Bank for Reconstruction and Development (%)" ,
    "16.9 Completeness of birth registration (%)" ,
    "16.10 Cases of killings of journalists and media personnel - Both sexes (cases)" ,
    "16.10 Cases of killings of journalists and media personnel - Male (Number)" ,
    "16.10 Cases of killings of journalists and media personnel - Female (Number)" ,
    "16.10.2 - Number of countries that adopt and implement constitutional  statutory and/or policy guarantees for public access to information ((1 = Yes  0 = No))" ,
    "16.a.1 - Proportion of countries that applied for accreditation as independent National Human Rights Institutions in compliance with the Paris Principles - SG_NHR_INTEXST - Percent (%)" ,
    "16.a.1 - Number of countries with National Human Rights Institutions in compliance with the Paris Principles - SG_NHR_IMPLN - Not applicable ((1 = Yes 0 = No))" ,
    "17.1 Revenue  excluding grants (% of GDP)" ,
    "17.1 Tax revenue (% of GDP)" ,
    "17.2.1 - Net official development assistance (ODA) from OECD-DAC countries  by donor - DC_ODA_TOTL - Constant USD (constant US$)" ,
    "17.2.1 - Net official development assistance (ODA) to LDCs from OECD-DAC countries  by donor - DC_ODA_LDCS - Constant USD (constant US$)" ,
    "17.2.1 - Net official development assistance (ODA) as a percentage of OECD-DAC donors' GNI  by donor - DC_ODA_TOTG - Percent (%)" ,
    "17.2.1 - Net official development assistance (ODA) to LDCs as a percentage of OECD-DAC donors' GNI  by donor - DC_ODA_LDCG - Percent (%)" ,
    "17.3 Foreign direct investment  net outflows (% of GDP)" ,
    "17.3 Personal remittances  received (% of GDP)" ,
    "17.4 Total debt service (% of exports of goods  services and primary income)" ,
    "17.6 Fixed broadband subscriptions (per 100 people)" ,
    "17.8 Individuals using the Internet (% of population)" ,
    "17.8 Internet Users by World Region" ,
    "17.9 Net official development assistance and official aid received (constant 2013 US$)" ,
    "17.10 Tariff rate  applied  weighted mean  all products (%)" ,
    "17.11 Exports of goods and services (constant 2010 US$)" ,
    "17.12 tariff rates - All products (%)" ,
    "17.12 tariff rates - Primary products (%)" ,
    "17.12 tariff rates - Manufactured products (%)" ,
    "17.15 use of CRF tools by providers of development cooperation - Country-led results frameworks by providers (%)" ,
    "17.15 use of CRF tools by providers of development cooperation - Country-led results frameworks by recipients (%)" ,
    "17.15 use of CRF tools by providers of development cooperation - New interventions from frameworks by recipients (%)" ,
    "17.15 use of CRF tools by providers of development cooperation - Interventions from frameworks by providers (%)" ,
    "17.15 use of CRF tools by providers of development cooperation - Monitored using gov't sources & monitoring by providers (%)" ,
    "17.16.1 - Progress in multi-stakeholder development effectiveness monitoring frameworks that support the achievement of the sustainable development goals ((1 = Yes  0 = No))" ,
    "17.18 Statistical Capacity Indicator (World Bank)" ,
    "17.18 Countries with fully funded statistical plans - Funding from donors (countries)" ,
    "17.18 Countries with fully funded statistical plans - Statistical plans under implementation (countries)" ,
    "17.18 Countries with fully funded statistical plans - Funding from others (countries)" ,
    "17.18 Countries with fully funded statistical plans - Funding from Government (countries)" ,
    "17.19 Population Census in last 10 years" ,
    "17.19 Completeness of birth registration (%)" ,
    "17.19 % of reported total deaths to estimated total deaths" ]
    
    let csvDataSourceData = '';
    const unIndicators = require('../assets/data/unsdgapi.json');
    
    // let indi = [];    
    let targ = [];
    let redirectSdg = 0;
    let redirectSdgIndicator = ''
    let indic = []

    const [indexMapData, setIndexMapData] = useState([]);
    const [indexRadarChartData, setIndexRadarChartData] = useState([]);

    if(props.location.state != null){
        if(parseInt(props.location.state) === 18){
            redirectSdg = 0
            
        }else{
            redirectSdg = props.location.state
            keysHardCode.forEach(function(indicator){
                if(indicator.startsWith(redirectSdg + ".1")){
                    indic.push(indicator);
                }
            })
            redirectSdgIndicator = indic[0];
        }
    }

    const [activSdg, setActiveSdg] = useState(redirectSdg);
    const [target, setTarget] = useState(parseInt(redirectSdg) + ".1");
    const [indicator, setIndicator] = useState(redirectSdgIndicator);
    const [indicators, setIndicators] = useState(indic);
    
    const parseCountriesRegions = () =>{
        let nodes = []
        regions.forEach(function(region){
            let countriesPerRegion = []
            countries.forEach(function(country){
                if(country.region === region){
                    countriesPerRegion.push({
                        value: country.alpha2Code,
                        label: country.name
                    })
                }
            })
            nodes.push({
                value : region,
                label : region + " Africa",
                children: countriesPerRegion
            })
        })
        return nodes
    }
    
    function handleIndexChildClick(country){
        setCountry(country);
    }

    function handleSdgChildClick(country){
        setMapChartType('line');
        setCountry(country);
    }

    //Set the country and regions popup data
    useEffect(() => {
        const nodes = parseCountriesRegions()
        setRegionCountries(nodes)
    }, [])

    const fetchNormalizedCsv = (csv) => {
        let normalizedData = []
        Papa.parse(csv, {
          download: true,
          header: true,
          skipEmptyLines: false,
          complete: function(results){
            normalizedData = results.data
            parseNormalizedData(normalizedData);
          }
        })
      }
 

    //Changes spider chart based on index map country click
    useEffect(() => {
        const loadNormalizedData = async() => {
            let apiData = []
            let normalizedApiData = {}
            let normalizedCsv = require('../assets/data/normalizedGoalValues.csv');

            const result = await axios(API_BASE+'/files');
            apiData =  result.data.data;

            if(apiData.length !== 0){
                apiData.forEach(function(d){
                    if(d.page === "SDG" && d.section === 'Normalized data'){
                        normalizedApiData = d.data
                    }
                })
                //SDG goal values
                if(Object.getOwnPropertyNames(normalizedApiData).length !== 0){
                    parseNormalizedData(normalizedApiData);
                }else{
                    fetchNormalizedCsv(normalizedCsv);
                }
            }else{
                fetchNormalizedCsv(normalizedCsv);
            }
        }
        loadNormalizedData();
    }, [country]);


    useEffect(() => {
        if(parseInt(activSdg) !== 0){
            targ = unIndicators[activSdg-1].targets;
        }
        setSdgTargets(targ);
        let indic = []
        if(parseInt(activSdg) !== 0){
            keysHardCode.forEach(function(indicator){
                if(indicator.startsWith(targ[0].code)){
                    indic.push(indicator);
                }
            })
        }
    }, [target, activSdg])

    useEffect(() => {
        let isSubscribed = true;
        if(dataSource === 'pan'){
            csvDataSourceData = require("../assets/data/sdg/pan.csv");
        }else if (dataSource === 'gdb'){
            csvDataSourceData = require("../assets/data/sdg/gdb.csv");
        }

        const loadSdgData = (sdgCsvFile) => {
            setIsLoading(true);
            Papa.parse(sdgCsvFile, {
                download: true,
                header: true,
                complete: function(results){
                    if(isSubscribed){
                        parseMapData(results.data);
                        const chartData = parseChartData(results.data)
                        filterChartData(chartData);
                        parseLineData(results.data);
                        setIsLoading(false);
                    }
                }
            })
        }
        loadSdgData(csvDataSourceData);
        getGoalTitles(data)
        return () => isSubscribed = false
    }, [dataSource, indicator, year, target, activSdg, isChecked, country]);

    const parseNormalizedData = (data) => {
        const goals = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];
        const mapData = [];
        const radarData = [];

        data.forEach(function(d){
            mapData.push({
                "code": (d.id),
                "value": Math.round(parseFloat(d.Score) * 100) / 100,
                "name": d.Country
            })
        })
        goals.forEach(function(goal) {
            data.forEach(function(d){
                if(country === d.id){
                    radarData.push({
                        "category": goal,
                        value1 : d["goal"+goal],
                    })
                }
            })
        })
        
        setIndexMapData(mapData);
        setIndexRadarChartData(radarData);
    }

    const parseMapData = (data) => {
        const mapData = [];
        let indicatorData = ''
        data.forEach(function(d){
            if(d.Year === year ){
                if(d[indicator] === ""){
                    indicatorData = null
                }else{
                    indicatorData = parseInt(d[indicator])
                }
                mapData.push({
                    "code": d.Code,
                    "drilldown" : d.Code + "/" + d.Code + "-all",
                    "value": Math.round(parseFloat(indicatorData) * 100) / 100,
                    "country": d.Entity
                })  
            }
        })
        setSdgMapData(mapData);
    }

    const parseChartData = (data) => {
        const indicatorData = [];
        data.forEach(function(d){
            if(d.Year === year ){
                indicatorData.push([ d.Code, parseInt(d[indicator])])  
            }
        })
       return indicatorData
    }
    const filterChartData = (myChartData) =>{
        let filteredChartData = []
        isChecked.forEach(function(checked){
            myChartData.forEach(function(data){
                if(data.includes(checked.toLowerCase())){
                    for(const country of countries){
                        if (country.alpha2Code === checked){
                            data[0] = country.name
                        }
                    }
                    filteredChartData.push(data)
                }
            })
        })
        setSdgChartData(filteredChartData);
    }

    const parseLineData = (data) => {
        let countryData = []
        let countryLabel = ''
        years =  years.sort((a, b) => a - b);
        
        data.forEach(function(d){
            years.forEach(function(year){
                if(parseInt(year) === parseInt(d.Year) && country.toLowerCase() === d.Code){
                    countryData.push(parseInt(d[indicator]))
                    countryLabel = d.Entity
                }
            })
        })
        setCountryLabel(countryLabel)
        setLineChartData(countryData);
    }

    //Choose SDG
    const handleSdgChange = (sdg) => {
        setActiveSdg(sdg);
        setTarget(sdg + ".1" );

        let indic = []
        keysHardCode.forEach(function(indicator){
            if(indicator.startsWith(sdg + ".1")){
                indic.push(indicator);
            }
        })
        setIndicator(indic[0]);
        setIndicators(indic);
    }


    //Choose target
    const handleTargetChange = (e) => {
        setTarget(e.target.value);
        let indic = []
        keysHardCode.forEach(function(indicator){
            if(indicator.startsWith( (e.target.value).toUpperCase()) || indicator.startsWith(e.target.value) ){
                indic.push(indicator);
            }
        })
        setIndicators(indic);
    }

    //Choose indicator
    const handleIndicatorChange = (e) => {
        setIndicator(e.target.value);
    }

     //Choose year
     const handleYearChange = (e) => {
        setYear(e.target.value);
    }
    
    const handleDataSourceChange = (e) => {
        setDataSource(e.target.value);
    }

    const setMapType = () =>{
        setMapChartType('map')
    }
    const setChartType = () =>{
        setMapChartType('chart')
    }
    const setLineChartType = () => {
        setMapChartType('line')
    }

    const openModal = (countryId) => {
        setOpenModal(true);
    }
    const closeModal = () => {
        setOpenModal(false);
    }
    const handleCountryChange = (event) => {
        console.log(activSdg);
        setCountry(event.target.value);
    }
    const handleCheck = (event) => {
        setIsChecked(event)
    }
    const getGoalTitles = (data) => {
        data.forEach(function(d){
            if(parseInt(activSdg) === parseInt(d.id)){
                setGoalTitle(d.title)
            }
        })
    }
    

    return(
        <>
        <Header onActiveSdgChanged={handleSdgChange}></Header>
            <main className="sdg">
            <div className="container">  
            {
                 parseInt(activSdg) !== 0 ? (
                   <div>
                        <h4 className="aspiration-title p-3"> GOAL  {activSdg} :  {goalTitle} </h4>
                        <Row className="mt-4 optionButtons no-gutters">
                            <Col md="1">
                            
                                <Input type="select" name="targetSelect" onChange={handleTargetChange} value={target}>
                                        {
                                        sdgTargets.map((target, index) =>{
                                        return <option key={index} value={target.code}> {target.code}</option>
                                        })
                                    }
                                </Input>
                            </Col>
                            <Col md="6">
                                <Input type="select" name="indicatorSelect" onChange={handleIndicatorChange} value={indicator}>
                               
                                    {
                                        indicators.map((indicator, index) => {
                                            return <option key={index} value={indicator}>{indicator}</option>
                                        })
                                    }
                                </Input>
                            </Col>
                            {
                                mapChartType === 'line' ? (
                            <Col md="2">
                                <Input type="select" name="countrySelect" onChange={handleCountryChange} value={country}>
                                    {
                                        countries.map((country, index) => {
                                            return <option key={index} value={country.alpha2Code}>{country.name}</option>
                                        })
                                    }
                                </Input>
                            </Col>
                                ):(
                            <Col md="2">
                                <Input type="select" name="yearSelect"  onChange={handleYearChange} value={year}> 
                                        {
                                            years.map((year, index) => {
                                            return <option key={index} value={year}> {year} </option>
                                            })
                                        }
                                </Input>
                            </Col> 
                            )  }
                            <Col className="lastChild" md="3">
                                <Input type="select" name="datasourceSelect" onChange={handleDataSourceChange} value={dataSource}>
                                        <option value="gdb">Global Database</option>
                                        <option value="mrs">PanAfrican MRS</option>
                                </Input>
                            </Col>      
                        </Row>
                        <Row className="mt-5">
                            <Col md="11" className="map-chart-container">
                                {
                                    mapChartType === 'map' ? (
                                        isLoading ? (
                                            <Spinner></Spinner>
                                        ) : (
                                            <div>
                                                <SdgMap mySdgData ={sdgMapData} onCountryClick={handleSdgChildClick}></SdgMap>
                                            </div>
                                        )
                                    ): null
                                }

                                {
                                    mapChartType === 'chart' ? (
                                        isLoading ? (
                                            <Spinner></Spinner> 
                                        ) : (
                                            <div>
                                                <div className="add-country-div">
                                                    <Button className="btn-link ml-1 add-country-btn" color="info" type="button" onClick={openModal}>
                                                            <i className="fa fa-plus-circle mr-1" />
                                                            Select country/ region
                                                    </Button>
                                                    {/* <Button className="btn-link ml-1 add-country-btn" color="info" type="button" onClick={openRegionModal}>
                                                            <i className="fa fa-plus-circle mr-1" />
                                                            Select region
                                                    </Button> */}
                                                </div>
                                                
                                                <SdgHighChart myChartData = {sdgChartData} indicator = {indicator} years = {years}></SdgHighChart>
                                            </div>        
                                        )
                                    ): null
                                }

                                {
                                    mapChartType === 'line' ? (
                                        isLoading ? (
                                            <Spinner></Spinner> 
                                        ) : (
                                            <div>
                                            <div className="add-country-div">
                                                {/* <Button className="btn-link ml-1 add-country-btn" color="info" type="button" onClick={openModal}>
                                                        <i className="fa fa-plus-circle mr-1" />
                                                        Add year
                                                </Button> */}
                                            </div>
                                            
                                                <LineChart lineChartData = {lineChartData} indicator = {indicator} years = {years} country ={countryLabel}></LineChart>
                                            </div>
                                        )
                                    ): null
                                }  
                            </Col>

                            <Col md="1">
                                <div>
                                    <br></br><br></br>
                                    <Button color="primary" type="button" className={ classnames("btn-icon" , { active: mapChartType === 'map' })} onClick={setMapType}>
                                    <FontAwesomeIcon icon="globe-africa" />
                                    
                                    </Button>
                                    <br></br><br></br>
                                    <Button color="primary" type="button" className={ classnames("btn-icon" , { active: mapChartType === 'chart' })}  onClick={setChartType}> 
                                    <FontAwesomeIcon icon="chart-bar" />
                                    
                                    </Button>
                                    <br></br><br></br>
                                    <Button color="primary" type="button" className={ classnames("btn-icon" , { active: mapChartType === 'line' })}  onClick={setLineChartType}> 
                                    <FontAwesomeIcon icon="chart-line" />
                                    
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                   </div>
                ) : (
                    <div>
                        <Row className="mt-4 optionButtons ">
                            <Col>
                                <Label className="all-sdgs-label">ALL SDGs </Label>
                            </Col>
                            <Col>
                                <Input type="select" name="countrySelect" onChange={handleCountryChange} value={country}>
                                    {
                                        countries.map((country, index) => {
                                            return <option key={index} value={country.alpha2Code}>{country.name}</option>
                                        })
                                    }
                                </Input>
                            </Col>
                            <Col>
                                <Input type="select" name="yearSelect"  onChange={handleYearChange} value={year}> 
                                        {
                                            sdgAllYears.map((year, index) => {
                                            return <option key={index} value={year}> {year} </option>
                                            })
                                        }
                                </Input>
                            </Col>   
                            <Col className="lastChild">
                                <Input type="select" name="datasourceSelect" onChange={handleDataSourceChange} value={dataSource}>
                                        <option value="gdb">Global Database</option>
                                        <option value="mrs">PanAfrican MRS</option>
                                </Input>
                            </Col>      
                        </Row>
                    
                        <Row className="mt-3">
                            <Col lg="6" md="12">
                                <IndexMap mySdgData ={indexMapData} onCountryClick={handleIndexChildClick}></IndexMap>
                            </Col>
                            <Col lg="6" md="12">
                                <RadarChart radarData={indexRadarChartData}></RadarChart>
                            </Col>
                        </Row>
                    </div>
                )
            }

                <Container className="pb-3">
                    <Modal size="xl" className="modal-dialog-centered" isOpen={toggleModal}
                        toggle={toggleModal}  >
                        <div className="modal-header">
                        <h6 className="">Choose data to show</h6>
                            <button aria-label="Close" className="close" data-dismiss="modal" type="button"
                                onClick={closeModal} >
                                <span aria-hidden={true}>×</span>
                            </button>
                        </div>
                        <div className="modal-body" >
                            <Container className="pb-3">
                                <Row>
                                <CheckboxTree
                                    nodes={regionCountries}
                                    checked={isChecked}
                                    expanded={isExpanded}
                                    onCheck={handleCheck} showNodeIcon={false} showExpandAll={false}
                                />
                                    
                                </Row>
                            </Container>   
                        </div>
                    </Modal>
                   
                </Container>
                
            </div>
        </main>
        <Footer></Footer>
        </>
    )
}

export default Sdgs1;