const ctx = document.getElementById('incomeChart').getContext('2d');
axios.get('http://localhost:5000/tax_post_income')
    .then(function (response) {
        const data = {
            labels: Object.keys(response.data),
            datasets: [{
                label: 'after-tax income',
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
                        max: 150000
                    },
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
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

        const incomeChart = new Chart(ctx, config);

        const differenceData = {
            labels: Object.keys(response.data),
            datasets: [{
                label: 'income difference between before and after tax',
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
                        max: 150000
                    },
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
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
        const differenceChartCtx = document.getElementById('differenceChart').getContext('2d');
        const differenceChart = new Chart(differenceChartCtx, differenceChartConfig);



    })
    .catch(function (error) {
        console.log(error);
    });