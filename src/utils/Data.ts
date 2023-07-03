

export const serverStatusChartOption=(prc:number,label:string)=>{
    return {
        chartOptions: {
            chart: {
                height: 260,
                type: "radialBar",
                fontFamily:'Montserrat,sans-serif'
            },
            colors: ["#20E647"],
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    track: {
                        background: '#333',
                        startAngle: -135,
                        endAngle: 135,
                    },
                    hollow: {
                        margin: 0,
                        size: "70%",
                        background: "#293450"
                    },

                    dataLabels: {
                        name: {
                            offsetY: -10,
                            color: "#fff",
                            fontSize: "13px"
                        },
                        value: {
                            color: "#fff",
                            fontSize: "30px",
                            show: true
                        }
                    }
                }
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    type: "vertical",
                    gradientToColors: ["#87D4F9"],
                    stops: [0, 100]
                }
            },
            stroke: {
                lineCap: "round"
            },
            labels: [`${label} Usage`]
        },
        series: [prc],
    }
}
export const bandWidthOption=(download:number, upload:number,unit:string)=>{
    return {
        series: [download, upload],
        chartOptions: {
            labels:['download','upload'],
            chart: {
                width: 350,
                type: 'donut',
                fontFamily:'Montserrat,sans-serif'
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                position: 'bottom',
                offsetY: -20,
                height: 70,
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                showAlways: true,
                                show: true,
                                formatter: function (w:any) {
                                    return w.globals.seriesTotals.reduce((a: number, b: number) => {
                                        return a+b;
                                    }, 0).toFixed(2) + ` ${unit}`
                                }
                            },

                        }
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: function (val:string) {
                        return val + ` ${unit}`
                    }
                }
            }
        }
    }
}
export const settingDropdownOption=[
    {
        icon:'fa-solid fa-trash',
        title:'Delete user',
        theme:'text-red-500'
    },{
        icon:'fa-solid fa-key',
        title:'Change password',
        theme:'text-blue-500'
    },{
        icon:'fa-solid fa-right-left',
        title:'Renew user',
        theme:'text-cyan-500'
    },{
        icon:'fa-solid fa-lock',
        title:'Lock user',
        theme:'text-red-500'
    },{
        icon:'fa-solid fa-lock-open',
        title:'Unlock user',
        theme:'text-green-500'
    },
];

export const settingTabItems=[
    {title:'Create admin user',link:{name:'CREATE_ADMIN_USER'},status:true},
    {title:'Change password',link:{name:'CHANGE_PASSWORD'},status:true},
    {title:'Multi server',link:{name:'MULTI_SERVER'},status:true},
    {title:'SSH port',link:{name:'SSH_PORT'},status:false},
    {title:'User limitation',link:{name:'USER_LIMITATION'},status:false},
    {title:'Telegram robot',link:{name:'TELEGRAM_ROBOT'},status:false},
    {title:'Backup and restore',link:{name:'BACKUP_RESTORE'},status:false},
    {title:'API',link:{name:'API'},status:false},
    {title:'IP block',link:{name:'IP_BLOCK'},status:false},
]