let outer = document.querySelector('.project-boxes');

export function piechart(){
    outer.innerText="";
    let chartcontainer = document.createElement("div");
    chartcontainer.className = "chart-container";

    let canvase = document.createElement("canvas");
    canvase.id = "myPieChart";

    chartcontainer.append(canvase);
    outer.append(chartcontainer);

    const ctx = document.getElementById('myPieChart').getContext('2d');
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Todo', 'Doing', 'Done'],
            datasets: [{
                data: [10, 5, 15],  // Replace with your data
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            let label = tooltipItem.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += Math.round(tooltipItem.raw);
                            return label;
                        }
                    }
                }
            }
        }
    });
}