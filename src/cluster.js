import cluster from 'cluster';
import os from 'os';

function start(){
    if(cluster.isMaster){
        const cpuCount = os.cpus().length;
        for(let i = 0; i < cpuCount; i++){
            cluster.fork();
        }
        cluster.on('exit', function(){
            cluster.fork();
        });
    }
    else{
        import('./index');
    }
}
start();
export default start;
