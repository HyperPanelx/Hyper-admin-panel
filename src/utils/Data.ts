

export const fakeSearchData=[
    {
        name:'Hooman Mousavi',
        rule:'Admin',
        img:'https://res.cloudinary.com/dhpxutwun/image/upload/v1684870684/hyper/profile_1_xe7zxp.svg',
        link:'DASHBOARD'
    },
    {
        name:'Alireza Alikhani',
        rule:'Admin',
        img:'https://res.cloudinary.com/dhpxutwun/image/upload/v1684870684/hyper/profile_3_qqtojq.svg',
        link:'DASHBOARD'

    },
    {
        name:'Hooman Mousavi',
        rule:'Admin',
        img:'https://res.cloudinary.com/dhpxutwun/image/upload/v1684870677/hyper/profile_4_onv3ig.svg',
        link:'DASHBOARD'

    },{
        name:'Alireza Alikhani',
        rule:'Admin',
        img:'https://res.cloudinary.com/dhpxutwun/image/upload/v1684870676/hyper/profile_6_qmlvib.svg',
        link:'DASHBOARD'

    },
    {
        name:'Hooman Mousavi',
        rule:'Admin',
        img:'https://res.cloudinary.com/dhpxutwun/image/upload/v1684870676/hyper/profile_5_db5rph.svg',                        link:'DASHBOARD'

    },
    {
        name:'Alireza Alikhani',
        rule:'Admin',
        img:'https://res.cloudinary.com/dhpxutwun/image/upload/v1684870676/hyper/profile_2_p0pbjb.svg',                        link:'DASHBOARD'

    },
]
export const fakeTodayNotificationData=[
    {
        sender:'Admin',
        content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, voluptas.',
        time:'1 hours ago',
        link:{name:'DASHBOARD'}
    },{
        sender:'Admin',
        content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, voluptas.',
        link:{name:'DASHBOARD'},
        time:'1 hours ago',
    }
]
export const fakeYesterdayNotificationData=[
    {
        sender:'Admin',
        content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, voluptas.',
        time:'1 hours ago',
        link:{name:'DASHBOARD'}
    },{
        sender:'Admin',
        content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, voluptas.',
        link:{name:'DASHBOARD'},
        time:'1 hours ago',
    }
]
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
export const bandWidthOption=(download:number, upload:number)=>{
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
                                    return w.globals.seriesTotals.reduce((a: any, b: any) => {
                                        return a + b
                                    }, 0) + ' MG'
                                }
                            },

                        }
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: function (val:string) {
                        return val + ' MG'
                    }
                }
            }
        }
    }
}
export const settingDropdownOption=[
    {
        icon:'ri:delete-bin-5-fill',
        title:'Delete user',
        theme:'text-red-500'
    },{
        icon:'ri:file-transfer-fill',
        title:'Change password',
        theme:'text-blue-500'
    },{
        icon:'ri:repeat-line',
        title:'Renew user',
        theme:'text-cyan-500'
    },{
        icon:'ri:lock-fill',
        title:'Lock user',
        theme:'text-red-500'
    },{
        icon:'ri:lock-unlock-fill',
        title:'Unlock user',
        theme:'text-green-500'
    },
];

export const settingTabItems=[
    {title:'Change password',link:{name:'CHANGE_PASSWORD'}},
    {title:'SSH port',link:{name:'SSH_PORT'}},
    {title:'User limitation',link:{name:'USER_LIMITATION'}},
    {title:'Telegram robot',link:{name:'TELEGRAM_ROBOT'}},
    {title:'Multi server',link:{name:'MULTI_SERVER'}},
    {title:'Backup and restore',link:{name:'BACKUP_RESTORE'}},
    {title:'API',link:{name:'API'}},
    {title:'IP block',link:{name:'IP_BLOCK'}},
]