import {customRef, Ref} from 'vue'
import {IServer_Usage_Response, IUseChartRef} from "../utils/Types";
import {bandWidthOption, serverStatusChartOption} from "../utils/Helper";


export function useChartRef<T extends IUseChartRef>(value:T):Ref<T> {
    return customRef((track, trigger) => {
        return {
            get():any{
                track()
                return value
            },
            set(newValue:IServer_Usage_Response|IServer_Usage_Response[0]) {
                if(newValue[1]){
                    const data=newValue as IServer_Usage_Response
                    const uploadSpeed=data[1]['Upload Speed']
                    const downloadSpeed=data[1]['Download Speed']
                    const download=data[1]['Download']
                    const upload=data[1]['Upload']
                    const wrappedData={
                        cpu:data[0].cpu,
                        ram:data[0].mem,
                        disk:data[0].hdd,
                        bandWidth:{
                            download:Number(download.slice(0,download.length-2)) ,
                            upload: Number(upload.slice(0,upload.length-2)) ,
                            downloadSpeed:Number(downloadSpeed.slice(0,downloadSpeed.length-2)),
                            uploadSpeed:Number(uploadSpeed.slice(0,uploadSpeed.length-2)),
                            speedUnit:downloadSpeed.slice(downloadSpeed.length-2),
                        }
                    };
                    value={
                        cpu:{
                            options:serverStatusChartOption(wrappedData.cpu,'CPU')?.chartOptions ?? null,
                            series:serverStatusChartOption(wrappedData.cpu,'CPU')?.series ?? null
                        },
                        ram:{
                            options:serverStatusChartOption(wrappedData.ram,'RAM')?.chartOptions ?? null,
                            series:serverStatusChartOption(wrappedData.ram,'RAM')?.series ?? null
                        },
                        disk:{
                            options:serverStatusChartOption(wrappedData.disk,'DISK')?.chartOptions ?? null,
                            series:serverStatusChartOption(wrappedData.disk,'DISK')?.series ?? null
                        },
                        bandwidth:{
                            options:bandWidthOption(wrappedData?.bandWidth?.downloadSpeed,wrappedData?.bandWidth.uploadSpeed,wrappedData?.bandWidth?.speedUnit)?.chartOptions,
                            series:bandWidthOption(wrappedData?.bandWidth?.downloadSpeed,wrappedData?.bandWidth.uploadSpeed,wrappedData?.bandWidth?.speedUnit).series
                        },
                    } as T;
                    trigger()
                }else{
                    const data=newValue as IServer_Usage_Response[0]
                    const wrappedData={
                        cpu:data.cpu,
                        ram:Number(Number(data.mem).toFixed(2)),
                        disk:data.hdd,
                    };
                    value={
                        cpu:{
                            options:serverStatusChartOption(wrappedData.cpu,'CPU')?.chartOptions ?? null,
                            series:serverStatusChartOption(wrappedData.cpu,'CPU')?.series ?? null
                        },
                        ram:{
                            options:serverStatusChartOption(wrappedData.ram,'RAM')?.chartOptions ?? null,
                            series:serverStatusChartOption(wrappedData.ram,'RAM')?.series ?? null
                        },
                        disk:{
                            options:serverStatusChartOption(wrappedData.disk,'DISK')?.chartOptions ?? null,
                            series:serverStatusChartOption(wrappedData.disk,'DISK')?.series ?? null
                        }
                    } as T;
                    trigger()
                }


            },
        }
    })
}