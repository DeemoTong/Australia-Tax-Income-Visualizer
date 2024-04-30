const ctx = document.getElementById('incomeChart').getContext('2d');
const differenceChartCtx = document.getElementById('differenceChart').getContext('2d');
const selectYearElement = document.getElementById('year');
let incomeChart = null;
let differenceChart = null;
document.addEventListener("DOMContentLoaded", function() {
    
    selectYearElement.dispatchEvent(new Event('change'));
});

selectYearElement.addEventListener('change', function () {
    const selectedYear = selectYearElement.value;
    axios.get('http://localhost:5000/tax_post_income', {
            params: {
                year: selectedYear
            }
        })
        .then(function (response) {
            const data = {
                labels: Object.keys(response.data),
                datasets: [{
                    label: `${selectedYear} After-tax Income`,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    data: Object.values(response.data),
                }]
            };

            const config = {
                type: 'line',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            min: 0,
                            max: 200000,
                            title: {
                                display: true,
                                text: 'Income (AUD)',
                            }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'After-tax Income (AUD)',
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        },
                        zoom: {
                            pan: {
                                enabled: true,
                                mode: 'x'
                            },
                            zoom: {
                                wheel: {
                                    enabled: true,
                                },
                                pinch: {
                                    enabled: true
                                },
                                mode: 'x'
                            },
                            
                            scales: {
                                x: {
                                    min: 0, 
                                },
                                y: {
                                    min: 0,
                                }
                            }
                        }
                    }
                }
            };

            
            if (incomeChart) {
                incomeChart.destroy();
            }
            
            incomeChart = new Chart(ctx, config);

            const differenceData = {
                labels: Object.keys(response.data),
                datasets: [{
                    label: 'Income Difference',
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    data: Object.keys(response.data).map(income => income - response.data[income]),
                }]
            };
            const differenceChartConfig = {
                type: 'line',
                data: differenceData,
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            min: 0,
                            max: 200000,
                            title: {
                                display: true,
                                text: 'Income (AUD)',
                            }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Income Difference (AUD)',
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        },
                        zoom: {
                            pan: {
                                enabled: true,
                                mode: 'x'
                            },
                            zoom: {
                                wheel: {
                                    enabled: true,
                                },
                                pinch: {
                                    enabled: true
                                },
                                mode: 'x'
                            }
                        }
                    }
                }
            };

           
            if (differenceChart) {
                differenceChart.destroy();
            }
            
            differenceChart = new Chart(differenceChartCtx, differenceChartConfig);
        })
        .catch(function (error) {
            console.log(error);
        });
});
