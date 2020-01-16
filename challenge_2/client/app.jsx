import React from 'react';
import axios from 'axios';
var Chart = require('chart.js');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
            .then((res) => {
                console.log(res.data.bpi);
                this.setState({
                    data: res.data.bpi,
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    render() {
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Object.keys(this.state.data),
                datasets: [{
                    label: 'BTC',
                    data: Object.values(this.state.data),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        return (
            <div>
                <div>Historical price data for any cryptocurrency</div>
            </div>
        );
    }
}

export default App;
