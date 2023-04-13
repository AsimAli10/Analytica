/**
=========================================================
* Analytica - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

export default function formatDataForChart(data) {
    const ageLabels = ['<18', '18-25', '26-35', '36-50', '50+'];
    const ageData = Object.values(data.age_group);
    const genderLabels = Object.keys(data.gender);
    const genderData = Object.values(data.gender);
    const cityLabels = Object.keys(data.city);
    const cityData = Object.values(data.city);
    const ageDataset = { label: 'Age Group', data: ageData };
    const ageChart = {
      labels: ageLabels,
      datasets: ageDataset
    };
  
    const genderDataset={label: 'Gender', data: genderData}
    const genderChart = {
      labels: genderLabels,
      datasets: genderDataset
    };
  
    const cityDataset={label: 'City', data: cityData}
    const cityChart = {
      labels: cityLabels,
      datasets: cityDataset
    };
  
    return { ageChart, genderChart, cityChart };
  }
  