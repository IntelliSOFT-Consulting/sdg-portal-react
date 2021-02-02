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
    const [dataSource, setDataSource] = useState('gdb');
    const [year, setYear] = useState('2006');
    const [mapChartType, setMapChartType] = useState('map'); 
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingNormalized, setIsLoadingNormalized] = useState(true);
    const [isLoadingRadar, setIsLoadingRadar] = useState(false);
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
    const toggle = () => setOpenModal(!toggleModal);

    const panAfricanIndicators = [ "1.1.1.a: Proportion of population below the international poverty line, by sex, age, employment status and geographical location (urban/rural)",
"1.1.1.b: Proportion of population below the international poverty line, by sex, age, employment status and geographical location (urban/rural)",
"1.2.1 Proportion of population living below the national poverty line, by sex and age",
"1.2.2 Proportion of men, women and children of all ages living in poverty in all its dimensions according to national definitions",
"1.3.1 Proportion of population covered by social protection floors/systems, by sex, distinguishing children, unemployed persons, older persons, persons with disabilities, pregnant women, newborns, work-injury victims and the poor and the vulnerable",
"1.4.1 Proportion of population living in households with access to basic services",
"1.4.2 Proportion of total adult population with secure tenure rights to land, with legally recognized documentation and who perceive their rights to land as secure, by sex and by type of tenure",
"1.5.1 Number of deaths, missing persons and persons affected by disaster per 100,000 population",
"1.5.2  Direct economic loss attributed to disasters in relation to global gross domestic product (GDP) ",
"1.5.3 Number of countries that adopt and implement national disaster risk reduction strategies in line with the Sendai Framework for Disaster Risk Reduction 2015–2030",
"1.5.4 Proportion of local governments that adopt and implement local disaster risk reduction strategies in line with national disaster risk reduction strategies",
"1.a.1 Proportion of resources allocated by the government directly to poverty reduction programmes",
"1.a.2 Proportion of total government spending on essential services (education, health and social protection)",
"1.a.3 Sum of total grants and non-debt-creating inflows directly allocated to poverty reduction programmes as a proportion of GDP",
"1.b.1 Proportion of government recurrent and capital spending to sectors that disproportionately benefit women, the poor and vulnerable groups",
"2.1.1 Prevalence of undernourishment",
"2.1.2 Prevalence of moderate or severe food insecurity in the population, based on the Food Insecurity Experience Scale (FIES)",
"2.2.1 Prevalence of stunting (height for age <-2 standard deviation from the median of the World Health Organization (WHO) Child Growth Standards) among children under 5 years of age",
"2.2.2a Prevalence of malnutrition among children under 5 years of age, by overweight",
"2.2.2b Prevalence of malnutrition among children under 5 years of age, by wasting",
"2.3.1 Volume of production per labour unit by classes of farming/pastoral/forestry enterprise size",
"2.3.2 Average income of small-scale food producers, by sex and indigenous status",
"2.4.1 Proportion of agricultural area under productive and sustainable agriculture",
"2.5.1 Number of plant and animal genetic resources for food and agriculture secured in either medium or long-term conservation facilities",
"2.5.2a Proportion of local breeds classified as being at risk",
"2.5.2a Proportion of local breeds classified as being not-at-risk",
"2.5.2a Proportion of local breeds classified as unknown level of risk of extinction",
"2.a.1 The agriculture orientation index for government expenditures",
"2.a.2 Total official flows (official development assistance plus other official flows) to the agriculture sector",
"2.b.1 Agricultural export subsidies",
"2.c.1 Indicator of food price anomalies",
"3.1.1 Maternal mortality ratio",
"3.1.2 Proportion of births attended by skilled health personnel",
"3.2.1 Under-five mortality rate",
"3.2.2 Neonatal mortality rate",
"3.3.1 Number of new HIV infections per 1,000 uninfected population, by all sex and all ages",
"3.3.1 Number of new HIV infections per 1,000 uninfected population, by both sex and 15 years and older",
"3.3.2 Tuberculosis incidence per 1,000 population",
"3.3.3 Malaria incidence per 1,000 population",
"3.3.4 Hepatitis B incidence per 100,000 population",
"3.3.5 Number of people requiring interventions against neglected tropical diseases",
"3.4.1 Mortality rate attributed to cardiovascular disease, cancer, diabetes or chronic respiratory disease",
"3.4.2 Suicide mortality rate",
"3.5.1 Coverage of treatment interventions (pharmacological, psychosocial and rehabilitation and aftercare services) for substance use disorders",
"3.5.2 Harmful use of alcohol, defined according to the national context as alcohol per capita consumption (aged 15 years and older) within a calendar year in litres of pure alcohol",
"3.6.1 Death rate due to road traffic injuries",
"3.7.1 Proportion of women of reproductive age (aged 15-49 years) who have their need for family planning satisfied with modern methods",
"3.7.2 Adolescent birth rate (aged 10-14 years) per 1,000 women in that age group",
"3.7.2 Adolescent birth rate (aged 15-19 years) per 1,000 women in that age group",
"3.8.1 Coverage of essential health services (defined as the average coverage of essential services based on tracer interventions that include reproductive, maternal, newborn and child health, infectious diseases, non-communicable diseases and service capacity and access, among the general and the most disadvantaged population)",
"3.8.2 Proportion of population with large household expenditures on health as a share of total household expenditure or income",
"3.9.1 Mortality rate attributed to household and ambient air pollution",
"3.9.2 Mortality rate attributed to unsafe water, unsafe sanitation and lack of hygiene (exposure to unsafe Water, Sanitation and Hygiene for All (WASH) services)",
"3.9.3 Mortality rate attributed to unintentional poisoning",
"3.a.1 Age-standardized prevalence of current tobacco use among persons aged 15 years and older",
"3.b.1 Proportion of the target population covered by all vaccines included in their national programme",
"3.b.2 Total net official development assistance to medical research and basic health sectors",
"3.b.3 Proportion of health facilities that have a core set of relevant essential medicines available and affordable on a sustainable basis",
"3.c.1 Physician density and distribution",
"3.c.1 Nursing and midwifery personnel density and distribution",
"3.c.1 Dentistry personnel density and distribution",
"3.c.1 Pharmaceutical personnel density and distribution",
"3.d.1  International Health Regulations (IHR) capacity and health emergency preparedness",
"4.1.1a  Proportion of children and young people: (a) in grades 2/3; (b) at the end of primary; and (c) at the end of lower secondary achieving at least a minimum proficiency level in (i) reading and (ii) mathematics, by sex",
"4.1.1b(i)  Proportion of children and young people at the end of primary achieving at least a minimum proficiency level in reading",
"4.1.1b(ii)  Proportion of children and young people at the end of primary achieving at least a minimum proficiency level in mathematics",
"4.1.1c(i)  Proportion of children and young people at the end of lower secondary achieving at least a minimum proficiency level in reading",
"4.1.1c(ii)  Proportion of children and young people at the end of lower secondary achieving at least a minimum proficiency level in mathematics",
"4.2.1  Proportion of children under 5 years of age who are developmentally on track in health, learning and psychosocial well-being, by sex",
"4.2.2  Participation rate in organized learning (one year before the official primary entry age), by sex",
"4.3.1  Participation rate of youth and adults (age 15-24) in formal and non-formal education and training in the previous 12 months, by sex",
"4.3.1  Participation rate of youth and adults (age 25-64) in formal and non-formal education and training in the previous 12 months, by sex",
"4.4.1  Proportion of youth and adults with information and communications technology (ICT) skills, by type of skill",
"4.5.1  Parity indices (female/male, rural/urban, bottom/top wealth quintile and others such as disability status, indigenous peoples and conflict-affected, as data become available) for all education indicators on this list that can be disaggregated",
"4.6.1  Percentage of population in a given age group achieving at least a fixed level of proficiency in functional literacy, by sex",
"4.6.1  Percentage of population in a given age group achieving at least a fixed level of proficiency in functional numeracy skills, by sex",
"4.7.1  Extent to which (i) global citizenship education and (ii) education for sustainable development, including gender equality and human rights, are mainstreamed at all levels in: (a) national education policies, (b) curricula, (c) teacher education and (d) student assessment",
"4.a.1  Proportion of primary schools with access to electricity",
"4.a.1  Proportion of primary schools with access to the Internet for pedagogical purposes",
"4.a.1  Proportion of primary schools with access to computers for pedagogical purposes",
"4.a.1  Proportion of primary schools with access to adapted infrastructure and materials for students with disabilities",
"4.a.1  Proportion of primary schools with access to basic drinking water",
"4.a.1  Proportion of primary schools with access to single-sex basic sanitation facilities",
"4.a.1  Proportion of primary schools with access to basic handwashing facilities (as per the WASH indicator definitions)",
"4.a.1  Proportion of lower secondary schools with access to electricity",
"4.a.1  Proportion of lower secondary schools with access to the Internet for pedagogical purposes",
"4.a.1  Proportion of lower secondary schools with access to computers for pedagogical purposes",
"4.a.1  Proportion of lower secondary schools with access to adapted infrastructure and materials for students with disabilities",
"4.a.1  Proportion of lower secondary schools with access to basic drinking water",
"4.a.1  Proportion of lower secondary schools with access to single-sex basic sanitation facilities",
"4.a.1  Proportion of lower secondary schools with access to basic handwashing facilities (as per the WASH indicator definitions)",
"4.a.1  Proportion of upper secondary schools with access to electricity",
"4.a.1  Proportion of upper secondary schools with access to the Internet for pedagogical purposes",
"4.a.1  Proportion of upper secondary schools with access to computers for pedagogical purposes",
"4.a.1  Proportion of upper secondary schools with access to adapted infrastructure and materials for students with disabilities",
"4.a.1  Proportion of upper secondary schools with access to basic drinking water",
"4.a.1  Proportion of upper secondary schools with access to single-sex basic sanitation facilities",
"4.a.1  Proportion of upper secondary schools with access to basic handwashing facilities (as per the WASH indicator definitions)",
"4.b.1  Volume of official development assistance flows for scholarships by sector and type of study",
"4.c.1  Proportion of teachers in pre-primary education who have received at least the minimum organized teacher training (e.g. pedagogical training) pre-service or in-service required for teaching at the relevant level in a given country",
"4.c.1  Proportion of teachers in primary education who have received at least the minimum organized teacher training (e.g. pedagogical training) pre-service or in-service required for teaching at the relevant level in a given country",
"4.c.1  Proportion of teachers in lower secondary education who have received at least the minimum organized teacher training (e.g. pedagogical training) pre-service or in-service required for teaching at the relevant level in a given country",
"4.c.1  Proportion of teachers in upper secondary education who have received at least the minimum organized teacher training (e.g. pedagogical training) pre-service or in-service required for teaching at the relevant level in a given country",
"5.1.1  Whether or not legal frameworks are in place to promote, enforce and monitor equality and non‑discrimination on the basis of sex",
"5.2.1  Proportion of ever-partnered women and girls aged 15 years and older subjected to physical, sexual or psychological violence by a current or former intimate partner in the previous 12 months, by form of violence and by age",
"5.2.2  Proportion of women and girls aged 15 years and older subjected to sexual violence by persons other than an intimate partner in the previous 12 months, by age and place of occurrence",
"5.3.1  Proportion of women aged 20-24 years who were married or in a union before age 15",
"5.3.1  Proportion of women aged 20-24 years who were married or in a union before age 18",
"5.3.2  Proportion of girls and women aged 15-49 years who have undergone female genital mutilation/cutting, by age",
"5.4.1  Proportion of time spent on unpaid domestic and care work, by sex, age and location",
"5.5.1a  Proportion of seats held by a) women in national parliaments and b) local governments",
"5.5.2  Proportion of women in managerial positions",
"5.6.1  Proportion of women aged 15-49 years who make their own informed decisions regarding sexual relations, contraceptive use and reproductive health care",
"5.6.2  Number of countries with laws and regulations that guarantee women aged 15-49 years access to sexual and reproductive health care, information and education",
"5.a.1  (a) Proportion of total agricultural population with ownership or secure rights over agricultural land, by sex;",
"5.a.2  Proportion of countries where the legal framework (including customary law) guarantees women’s equal rights to land ownership and/or control",
"5.b.1  Proportion of individuals who own a mobile telephone, by sex",
"5.c.1  Proportion of countries with systems to track and make public allocations for gender equality and women’s empowerment",
"6.1.1  Proportion of population using safely managed drinking water services",
"6.2.1  Proportion of population using safely managed sanitation services, including a hand-washing facility with soap and water",
"6.3.1  Proportion of wastewater safely treated",
"6.3.2  Proportion of bodies of water with good ambient water quality",
"6.4.1  Change in water-use efficiency over time",
"6.4.2  Level of water stress: freshwater withdrawal as a proportion of available freshwater resources",
"6.5.1  Degree of integrated water resources management implementation (0-100)",
"6.5.2  Proportion of transboundary basin area with an operational arrangement for water cooperation",
"6.6.1  Change in the extent of water-related ecosystems over time",
"6.a.1  Amount of water- and sanitation-related official development assistance that is part of a government-coordinated spending plan",
"6.b.1  Proportion of local administrative units with established and operational policies and procedures for participation of local communities in water and sanitation management",
"7.1.1  Proportion of population with access to electricity disaggregate by urban/rural",
"7.1.2  Proportion of population with primary reliance on clean fuels and technology",
"7.2.1  Renewable energy share in the total final energy consumption",
"7.3.1  Energy intensity measured in terms of primary energy and GDP",
"7.a.1 International financial flows to developing countries in support of clean energy research and development and renewable energy production, including in hybrid systems",
"7.b.1  Investments in energy efficiency as a percentage of GDP and the amount of foreign direct investment in financial transfer for infrastructure and technology to sustainable development services",
"8.1.1  Annual growth rate of real GDP per capita",
"8.2.1  Annual growth rate of real GDP per employed person",
"8.3.1  Proportion of informal employment in non‑agriculture employment, by sex",
"8.4.1 Material footprint, material footprint per capita, and material footprint per GDP",
"8.4.2  Domestic material consumption, domestic material consumption per capita, and domestic material consumption per GDP",
"8.5.1  Average hourly earnings of female and male employees, by occupation, age and persons with disabilities",
"8.5.2  Unemployment rate, by sex, age and persons with disabilities",
"8.6.1  Proportion of youth (aged 15-24 years) not in education, employment or training",
"8.7.1  Proportion and number of children aged 5‑17 years engaged in child labour, by sex and age",
"8.8.1  Frequency rates of fatal and non-fatal occupational injuries, by sex and migrant status",
"8.8.2  Increase in national compliance of labour rights (freedom of association and collective bargaining) based on International Labour Organization (ILO) textual sources and national legislation, by sex and migrant status",
"8.9.1  Tourism direct GDP as a proportion of total GDP and in growth rate",
"8.9.2 Proportion of jobs in sustainable tourism industries out of total tourism jobs",
"8.10.1 (a) Number of commercial bank branches per 100,000 adults",
"8.10.1 (b) Number of automated teller machines (ATMs) per 100,000 adults",
"8.10.2  Proportion of adults (15 years and older) with an account at a bank or other financial institution or with a mobile-money-service provider",
"8.a.1  Aid for Trade commitments and disbursements",
"8.b.1 Existence of a developed and operationalized national strategy for youth employment, as a distinct strategy or as part of a national employment strategy",
"9.1.1 Proportion of the rural population who live within 2 km of an all-season road",
"9.1.2 Passenger and freight volumes, by mode of transport",
"9.2.1(a) Manufacturing value added as a proportion of GDP",
"9.2.1(b) Manufacturing value added per capita",
"9.2.2 Manufacturing employment as a proportion of total employment",
"9.3.1 Proportion of small-scale industries in total industry value added",
"9.3.2 Proportion of small-scale industries with a loan or line of credit",
"9.4.1 CO2 emission per unit of value added",
"9.5.1 Research and development expenditure as a proportion of GDP",
"9.5.2 Researchers (in full-time equivalent) per million inhabitants",
"9.a.1 Total official international support (official development assistance plus other official flows) to infrastructure",
"9.b.1 Proportion of medium and high-tech industry value added in total value added",
"9.c.1 Proportion of population covered by a mobile network, by technology",
"10.1.1 Growth rates of household expenditure or income per capita among the bottom 40 per cent of the population and the total population",
"10.2.1 Proportion of people living below 50 per cent of median income, by sex, age and persons with disabilities",
"10.3.1 Proportion of population reporting having personally felt discriminated against or harassed in the previous 12 months on the basis of a ground of discrimination prohibited under international human rights law",
"10.4.1 Labour share of GDP, comprising wages and social protection transfers",
"10.5.1 Financial Soundness Indicators",
"10.6.1 Proportion of members and voting rights of developing countries in international organizations",
"10.7.1 Recruitment cost borne by employee as a proportion of yearly income earned in country of destination",
"10.7.2 Number of countries that have implemented well-managed migration policies",
"10.a.1 Proportion of tariff lines applied to imports from least developed countries and developing countries with zero-tariff",
"10.b.1 Total resource flows for development, by recipient and donor countries and type of flow (e.g. official development assistance, foreign direct investment and other flows)",
"10.c.1 Remittance costs as a proportion of the amount remitted",
"11.1.1 Proportion of urban population living in slums, informal settlements or inadequate housing",
"11.2.1 Proportion of population that has convenient access to public transport, by sex, age and persons with disabilities",
"11.3.1 Ratio of land consumption rate to population growth rate",
"11.3.2 Proportion of cities with a direct participation structure of civil society in urban planning and management that operate regularly and democratically",
"11.4.1 Total expenditure (public and private) per capita spent on the preservation, protection and conservation of all cultural and natural heritage, by type of heritage (cultural, natural, mixed and World Heritage Centre designation), level of government (national, regional and local/municipal), type of expenditure (operating expenditure/investment) and type of private funding (donations in kind, private non-profit sector and sponsorship)",
"11.5.1 Number of deaths, missing persons and directly affected persons attributed to disasters per 100,000 population",
"11.5.2 Direct economic loss in relation to global GDP, damage to critical infrastructure and number of disruptions to basic services, attributed to disasters",
"11.6.1 Proportion of urban solid waste regularly collected and with adequate final discharge out of total urban solid waste generated, by cities",
"11.6.2 Annual mean levels of fine particulate matter (e.g. PM2.5 and PM10) in cities (population weighted)",
"11.7.1 Average share of the built-up area of cities that is open space for public use for all, by sex, age and persons with disabilities",
"11.7.2 Proportion of persons victim of physical or sexual harassment, by sex, age, disability status and place of occurrence, in the previous 12 months",
"11.a.1 Proportion of population living in cities that implement urban and regional development plans integrating population projections and resource needs, by size of city",
"11.b.1 Number of countries that adopt and implement national disaster risk reduction strategies in line with the Sendai Framework for Disaster Risk Reduction 2015–2030",
"11.b.2 Proportion of local governments that adopt and implement local disaster risk reduction strategies in line with national disaster risk reduction strategies",
"11.c.1 Proportion of financial support to the least developed countries that is allocated to the construction and retrofitting of sustainable, resilient and resource-efficient buildings utilizing local materials",
"12.1.1 Number of countries with sustainable consumption and production (SCP) national action plans or SCP mainstreamed as a priority or a target into national policies",
"12.2.1 Material footprint, material footprint per capita, and material footprint per GDP",
"12.2.2 Domestic material consumption, domestic material consumption per capita, and domestic material consumption per GDP",
"12.3.1 Global food loss index",
"12.4.1 Number of parties to international multilateral environmental agreements on hazardous waste, and other chemicals that meet their commitments and obligations in transmitting information as required by each relevant agreement",
"12.4.2 Hazardous waste generated per capita and proportion of hazardous waste treated, by type of treatment",
"12.5.1 National recycling rate, tons of material recycled",
"12.6.1 Number of companies publishing sustainability reports",
"12.7.1 Number of countries implementing sustainable public procurement policies and action plans",
"12.8.1 Extent to which (i) global citizenship education and (ii) education for sustainable development (including climate change education) are mainstreamed in (a) national education policies; (b) curricula; (c) teacher education; and (d) student assessment",
"12.a.1 Amount of support to developing countries on research and development for sustainable consumption and production and environmentally sound technologies",
"12.b.1 Number of sustainable tourism strategies or policies and implemented action plans with agreed monitoring and evaluation tools",
"12.c.1 Amount of fossil-fuel subsidies per unit of GDP (production and consumption) and as a proportion of total national expenditure on fossil fuels",
"13.1.1 Number of deaths, missing persons and directly affected persons attributed to disasters per 100,000 population",
"13.1.2 Number of countries that adopt and implement national disaster risk reduction strategies in line with the Sendai Framework for Disaster Risk Reduction 2015–2030",
"13.1.3 Proportion of local governments that adopt and implement local disaster risk reduction strategies in line with national disaster risk reduction strategies",
"13.2.1 Number of countries that have communicated the establishment or operationalization of an integrated policy/strategy/plan which increases their ability to adapt to the adverse impacts of climate change, and foster climate resilience and low greenhouse gas emissions development in a manner that does not threaten food production (including a national adaptation plan, nationally determined contribution, national communication, biennial update report or other)",
"13.3.1 Number of countries that have integrated mitigation, adaptation, impact reduction and early warning into primary, secondary and tertiary curricula",
"13.3.2 Number of countries that have communicated the strengthening of institutional, systemic and individual capacity-building to implement adaptation, mitigation and technology transfer, and development actions",
"13.a.1 Mobilized amount of United States dollars per year between 2020 and 2025 accountable towards the $100 billion commitment",
"13.b.1 Number of least developed countries and small island developing States that are receiving specialized support, and amount of support, including finance, technology and capacity-building, for mechanisms for raising capacities for effective climate change-related planning and management, including focusing on women, youth and local and marginalized communities",
"14.1.1 Index of coastal eutrophication and floating plastic debris density",
"14.2.1 Proportion of national exclusive economic zones managed using ecosystem-based approaches",
"14.3.1 Average marine acidity (pH) measured at agreed suite of representative sampling stations",
"14.4.1 Proportion of fish stocks within biologically sustainable levels",
"14.5.1 Coverage of protected areas in relation to marine areas",
"14.6.1 Progress by countries in the degree of implementation of international instruments aiming to combat illegal, unreported and unregulated fishing",
"14.7.1 Sustainable fisheries as a proportion of GDP in small island developing States, least developed countries and all countries",
"14.a.1 Proportion of total research budget allocated to research in the field of marine technology",
"14.b.1 Progress by countries in the degree of application of a legal/regulatory/policy/institutional framework which recognizes and protects access rights for small-scale fisheries",
"14.c.1 Number of countries making progress in ratifying, accepting and implementing through legal, policy and institutional frameworks, ocean-related instruments that implement international law, as reflected in the United Nations Convention on the Law of the Sea, for the conservation and sustainable use of the oceans and their resources",
"15.1.1 Forest area as a proportion of total land area",
"15.1.2 Proportion of important sites for terrestrial and freshwater biodiversity that are covered by protected areas, by ecosystem type",
"15.2.1 Progress towards sustainable forest management",
"15.3.1 Proportion of land that is degraded over total land area",
"15.4.1 Coverage by protected areas of important sites for mountain biodiversity",
"15.4.2 Mountain Green Cover Index",
"15.5.1 Red List Index",
"15.6.1 Number of countries that have adopted legislative, administrative and policy frameworks to ensure fair and equitable sharing of benefits arising from the utilization of genetic resources",
"15.7.1 Proportion of traded wildlife that was poached or illicitly trafficked",
"15.8.1 Proportion of countries adopting relevant national legislation and adequately resourcing the prevention or control of invasive alien species",
"15.9.1 Progress towards national targets established in accordance with Aichi Biodiversity Target 2 of the Strategic Plan for Biodiversity 2011–2020",
"15.a.1 Official development assistance and public expenditure on conservation and sustainable use of biodiversity and ecosystems",
"15.b.1 Official development assistance and public expenditure on conservation and sustainable use of biodiversity and ecosystems",
"15.c.1 Proportion of traded wildlife that was poached or illicitly trafficked",
"16.1.1 Number of victims of intentional homicide per 100,000 population, by sex and age",
"16.1.2 Conflict-related deaths per 100,000 population, by sex, age and cause",
"16.1.3 Proportion of population subjected to physical, psychological or sexual violence in the previous 12 months",
"16.1.4 Proportion of population that feel safe walking alone around the area they live",
"16.2.1 Proportion of children aged 1–17 years who experienced any physical punishment and/or psychological aggression by caregivers in the past month",
"16.2.2 Number of victims of human trafficking per 100,000 population, by sex, age and form of exploitation",
"16.2.3 Proportion of young women and men aged 18–29 years who experienced sexual violence by age 18",
"16.3.1 Proportion of victims of violence in the previous 12 months who reported their victimization to competent authorities or other officially recognized conflict resolution mechanisms",
"16.3.2 Unsentenced detainees as a proportion of overall prison population",
"16.4.1 Total value of inward and outward illicit financial flows (in current United States dollars)",
"16.4.2 Proportion of seized, found or surrendered arms whose illicit origin or context has been traced or established by a competent authority in line with international instruments",
"16.5.1 Proportion of persons who had at least one contact with a public official and who paid a bribe to a public official, or were asked for a bribe by those public officials, during the previous 12 months",
"16.5.2 Proportion of businesses that had at least one contact with a public official and that paid a bribe to a public official, or were asked for a bribe by those public officials during the previous 12 months",
"16.6.1 Primary government expenditures as a proportion of original approved budget, by sector (or by budget codes or similar)",
"16.6.2 Proportion of population satisfied with their last experience of public services",
"16.7.1 Proportions of positions (by sex, age, persons with disabilities and population groups) in public institutions (national and local legislatures, public service, and judiciary) compared to national distributions",
"16.7.2 Proportion of population who believe decision-making is inclusive and responsive, by sex, age, disability and population group",
"16.8.1 Proportion of members and voting rights of developing countries in international organizations",
"16.9.1 Proportion of children under 5 years of age whose births have been registered with a civil authority, by age",
"16.10.1 Number of verified cases of killing, kidnapping, enforced disappearance, arbitrary detention and torture of journalists, associated media personnel, trade unionists and human rights advocates in the previous 12 months",
"16.10.2 Number of countries that adopt and implement constitutional, statutory and/or policy guarantees for public access to information",
"16.a.1 Existence of independent national human rights institutions in compliance with the Paris Principles",
"16.b.1 Proportion of population reporting having personally felt discriminated against or harassed in the previous 12 months on the basis of a ground of discrimination prohibited under international human rights law",
"17.1.1 Total government revenue as a proportion of GDP, by source",
"17.1.2 Proportion of domestic budget funded by domestic taxes",
"17.2.1 Net official development assistance, total and to least developed countries, as a proportion of the Organization for Economic Cooperation and Development (OECD) Development Assistance Committee donors’ gross national income (GNI)",
"17.3.1 Foreign direct investment (FDI), official development assistance and South-South cooperation as a proportion of total domestic budget",
"17.3.2 Volume of remittances (in United States dollars) as a proportion of total GDP",
"17.4.1 Debt service as a proportion of exports of goods and services",
"17.5.1 Number of countries that adopt and implement investment promotion regimes for least developed countries",
"17.6.1 Number of science and/or technology cooperation agreements and programmes between countries, by type of cooperation",
"17.6.2 Fixed Internet broadband subscriptions per 100 inhabitants, 256 kbits/s to 2 Mbit/s",
"17.6.2 Fixed Internet broadband subscriptions per 100 inhabitants, 2 Mbit/s to less than 10 Mbits/s",
"17.6.2 Fixed Internet broadband subscriptions per 100 inhabitants, equal to or above 10 Mbit/s",
"17.7.1 Total amount of approved funding for developing countries to promote the development, transfer, dissemination and diffusion of environmentally sound technologies",
"17.8.1 Proportion of individuals using the Internet",
"17.9.1 Dollar value of financial and technical assistance (including through North-South, South‑South and triangular cooperation) committed to developing countries",
"17.10.1 Worldwide weighted tariff-average",
"17.11.1 Developing countries’ and least developed countries’ share of global exports",
"17.12.1 Average tariffs faced by developing countries, least developed countries and small island developing States",
"17.13.1 Macroeconomic Dashboard",
"17.14.1 Number of countries with mechanisms in place to enhance policy coherence of sustainable development",
"17.15.1 Extent of use of country-owned results frameworks and planning tools by providers of development cooperation",
"17.16.1 Number of countries reporting progress in multi-stakeholder development effectiveness monitoring frameworks that support the achievement of the sustainable development goals",
"17.17.1 Amount of United States dollars committed to public-private and civil society partnerships",
"17.18.1 Proportion of sustainable development indicators produced at the national level with full disaggregation when relevant to the target, in accordance with the Fundamental Principles of Official Statistics",
"17.18.2 Number of countries that have national statistical legislation that complies with the Fundamental Principles of Official Statistics",
"17.18.3 Number of countries with a national statistical plan that is fully funded and under implementation, by source of funding",
"17.18.3 Number of countries with a national statistical plan that is fully funded and under implementation, by source of funding",
"17.19.1 Dollar value of all resources made available to strengthen statistical capacity in developing countries",
"17.19.2(a) Proportion of countries that (a) have conducted at least one population and housing census in the last 10 years",
"17.19.2(b) Proportion of countries that have achieved 100 per cent birth registration ",
"17.19.2(b) Proportion of countries that have achieved 80 per cent death registration" ]

    let dict = {};
    let csvDict = {}; 

    dict['gdb'] = keysHardCode;
    dict['pan'] = panAfricanIndicators;

    

    const [dataSourceIndicators, setDataSourceIndicators] = useState(dict[dataSource])

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
            dataSourceIndicators.forEach(function(indicator){
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
        setIsLoadingRadar(true);
        setCountry(country);
    }

    function handleSdgChildClick(country){
        setMapChartType('line');
        const code = country.toUpperCase();
        setCountry(code);
        setIsChecked([code])
    }

    //Set the country and regions popup data
    useEffect(() => {
        const nodes = parseCountriesRegions()
        setRegionCountries(nodes)
    }, [])



    const fetchNormalizedCsv = (csv) => {
        setIsLoadingNormalized(true);
        let normalizedData = []
        Papa.parse(csv, {
          download: true,
          header: true,
          skipEmptyLines: false,
          complete: function(results){
            normalizedData = results.data
            parseNormalizedData(normalizedData);
            setIsLoadingNormalized(false);
          }
        })
      }

    

    const fetchCompiledCsv = (sdgCsvFile) => {
        setIsLoading(true);
        Papa.parse(sdgCsvFile, {
            download: true,
            header: true,
            complete: function(results){
                parseMapData(results.data);

                const chartData = parseChartData(results.data)
                filterChartData(chartData);

                const lineData = parseLineData(results.data);
                filterLineData(lineData)
                setIsLoading(false);
            }
        })
    }

    useEffect(() => {
        const fetchCompiledCsv = (sdgCsvFile) => {
            setIsLoading(true);
            Papa.parse(sdgCsvFile, {
                download: true,
                header: true,
                complete: function(results){
                    // parseMapData(results.data);
    
                    // const chartData = parseChartData(results.data)
                    // filterChartData(chartData);
    
                    // const lineData = parseLineData(results.data);
                    // filterLineData(lineData)
                    // setIsLoading(false);
                }
            })
        }
    }, [])


      //Fetch API Data
    const fetchApiData = async() => {
        const result = await axios(API_BASE+'/files');
        const apiData =  result.data.data;
        return apiData
    }


    //localStorage.removeItem('normalizedData')

    //Normalized data 
    //Changes spider chart based on index map country click
    useEffect(() => {
        let normalizedCsv = require('../assets/data/normalizedGoalValues.csv');
        const cachedNormalizedData = localStorage.getItem('normalizedData');

        if(cachedNormalizedData){
            parseNormalizedData(JSON.parse(cachedNormalizedData));
            parseIndexRadarData(JSON.parse(cachedNormalizedData))
            setIsLoadingNormalized(false);
        }else{
            fetchApiData().then(function(apiData) {
                let normalizedApiData = {}
                if(apiData.length !== 0){
                    apiData.forEach(function(d){
                        if(d.page === "SDG" && d.section === 'Normalized data'){
                            normalizedApiData = d.data
                        }
                    })

                    if(Object.getOwnPropertyNames(normalizedApiData).length !== 0){
                        parseNormalizedData(normalizedApiData);
                        localStorage.setItem('normalizedData', JSON.stringify(normalizedApiData));
                    }else{
                        fetchNormalizedCsv(normalizedCsv);
                    }
                }else{
                    fetchNormalizedCsv(normalizedCsv);
                }
                setIsLoadingNormalized(false);
            })
        }
    }, [country]);


    useEffect(() => {
        if(parseInt(activSdg) !== 0){
            targ = unIndicators[activSdg-1].targets;
        }
        setSdgTargets(targ);
        let indic = []
        if(parseInt(activSdg) !== 0){
            dataSourceIndicators.forEach(function(indicator){
                if(indicator.startsWith(targ[0].code)){
                    indic.push(indicator);
                }
            })
        }
    }, [target, activSdg, dataSource])

    //localStorage.removeItem('compiledData')

    useEffect(() => {
       
        let compiledCsv = require('../assets/data/sdg/sdgDataCompiled.csv');
        let gdbAfricanData = require('../assets/data/sdg/sdgCompiledGdb.csv');
        let panAfricanData = require('../assets/data/sdg/sdgCompiledPan.csv');

        csvDict['gdb'] = gdbAfricanData;
        csvDict['pan'] = panAfricanData;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
            fetchApiData().then(function(apiData) {
                let compiledApiData = {}
                if(apiData.length !== 0){
                    //console.log("data")
                    apiData.forEach(function(d){
                        if(d.page === "SDG" && d.section === 'Compiled data'){
                            compiledApiData = d.data
                        }
                    })

                    if(Object.getOwnPropertyNames(compiledApiData).length !== 0){
                        parseMapData(compiledApiData);
                        const chartData = parseChartData(compiledApiData)
                        filterChartData(chartData);

                        const lineData = parseLineData(compiledApiData);
                        filterLineData(lineData)
                    }else{                                                                                                                                                                                                                                                                                                                                              
                        fetchCompiledCsv(csvDict[dataSource]);
                    }
                }else{
                    fetchCompiledCsv(csvDict[dataSource]);
                }
                setIsLoadingNormalized(false);
            })
        
          //  console.log(dataSourceIndicators)

        // const loadSdgData = (sdgCsvFile) => {
        //     setIsLoading(true);
        //     Papa.parse(sdgCsvFile, {
        //         download: true,
        //         header: true,
        //         complete: function(results){
        //                 parseMapData(results.data);
        //                 const chartData = parseChartData(results.data)
        //                 filterChartData(chartData);

        //                 const lineData = parseLineData(results.data);
        //                 filterLineData(lineData)
        //                 setIsLoading(false);
        //             }
        //     })
        // }
       // loadSdgData(compiledCsv);
        getGoalTitles(data)
    }, [dataSource, indicator, year, target, activSdg, isChecked, country]);

    const parseNormalizedData = (data) => {
        const goals = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];
        const mapData = [];
        const radarData = [];

        data.forEach(function(d){
            if(d.Country){
                mapData.push({
                    "code": (d.id).toUpperCase(),
                    "value": Math.round(parseFloat(d.Score) * 100) / 100,
                    "name": d.Country
                })
            }
            
        })
       
        goals.forEach(function(goal) {
            data.forEach(function(d){
                if(d.Country){
                    if(country === (d.id).toUpperCase()){
                        radarData.push({
                            "category": goal,
                            value1 : d["goal"+goal],
                        })
                    }
                }
                
            })
        })
        setIndexMapData(mapData);
    }

    const parseIndexMapData = (data) => {
        const mapData = [];
        data.forEach(function(d){
            if(d.id !== undefined){
                mapData.push({
                    "code": (d.id).toUpperCase(),
                    "value": Math.round(parseFloat(d.Score) * 100) / 100,
                    "name": d.Country
                })
            }
            
        })
        setIndexMapData(mapData);
    }

    const parseIndexRadarData = (data) => {
        const goals = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];
        const radarData = [];
        goals.forEach(function(goal) {
            data.forEach(function(d){
                if(d.Country){
                    if(country === (d.id).toUpperCase()){
                        radarData.push({
                            "category": goal,
                            value1 : d["goal"+goal],
                        })
                    }
                }
                
            })
        })
        setIndexRadarChartData(radarData);
        setIsLoadingRadar(false);
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
    const filterLineData = (myLineData) =>{
        let filteredLineData = []
        isChecked.forEach(function(checked){
            myLineData.forEach(function(data){
                if(data.code == checked){
                    filteredLineData.push(data)
                }
            })
        })
        setLineChartData(filteredLineData)
    }

    const parseLineData = (data) => {
        let countryLabel = ''
        let lineChartData = []
        years =  years.sort((a, b) => a - b);

        countries.forEach(function(country){
            let countryData = []
            data.forEach(function(d){
                years.forEach(function(year){
                    if(parseInt(year) === parseInt(d.Year) && country.alpha2Code.toLowerCase() === d.Code ){
                        countryData.push(parseInt(d[indicator]))
                    }
                })
            })

            lineChartData.push({
                code: country.alpha2Code,
                name: country.name,
                data: countryData
            })
        })

        setCountryLabel(countryLabel) 
        return lineChartData;
    }

    //Choose SDG
    const handleSdgChange = (sdg) => {
        setActiveSdg(sdg);
        setTarget(sdg + ".1" );

        let indic = []
        dataSourceIndicators.forEach(function(indicator){
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
        dataSourceIndicators.forEach(function(indicator){
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
        let dataSource = e.target.value;

        setDataSourceIndicators(dict[dataSource]);

        let indic = []

        dict[dataSource].forEach(function(indicator){
            if(indicator.startsWith( (target).toUpperCase()) || indicator.startsWith(target) ){
                
                indic.push(indicator);
            }
        })

        setIndicator(indic[0]);
        setIndicators(indic);
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
                                        <option value="pan">PanAfrican MRS</option>
                                </Input>
                            </Col>      
                        </Row>

                        <Row className="mt-3">
                            { 
                                dataSource === 'pan' ? (
                                <label className="disclaimer-text">
                                        Disclaimer: The Pan African MRS data shown on this website is based on previous Global Database data. 
                                    </label>
                                ) : (
                                    null
                                )
                            }
                        </Row>

                        <Row className="mt-3">
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
                                                <Button className="btn-link ml-1 add-country-btn" color="info" type="button" onClick={openModal}>
                                                        <i className="fa fa-plus-circle mr-1" />
                                                        Add Country
                                                </Button>
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
                                        <option value="pan">PanAfrican MRS</option>
                                </Input>
                            </Col>      
                        </Row>
                       
                        {
                            isLoadingNormalized ? (
                                <Row className="mt-3 spinner-height">
                                    <Spinner></Spinner>
                                </Row>
                               
                            ):(
                                <Row className="mt-3">
                                    <Col lg="6" md="12">
                                        <IndexMap mySdgData ={indexMapData} onCountryClick={handleIndexChildClick}></IndexMap>
                                    </Col>
                                    {   
                                        isLoadingRadar ? (
                                            <Col lg="6" md="12" className="spinner-height">
                                                <Spinner></Spinner>
                                            </Col>
                                        ):(
                                            <Col lg="6" md="12">
                                                <RadarChart radarData={indexRadarChartData}></RadarChart>
                                            </Col>
                                        )
                                    }
                                    
                                </Row>
                            )
                        }
                    </div>
                )
            }

                <Container className="pb-3">
                    <Modal size="xl" className="modal-dialog-centered" isOpen={toggleModal}
                        toggle={toggle}  >
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