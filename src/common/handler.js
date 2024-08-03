export const handlerTime = (time) => {//分'秒"处理
	let minute = parseInt(time / 60); //时间分钟取整
	minute = minute < 10 ? '0' + minute : minute;
	let seconde = parseInt(time % 60);
	 seconde=seconde<10? '0' +seconde:seconde;//秒钟取余
	return minute + " '" + seconde + '"';

}

// function const  addFormatTime(seconds) {//作品时间单位为秒处理成距现在时间为天，时，分
//    days = Math.floor(seconds / (24 * 60 * 60));
//    hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
//    minutes = Math.floor((seconds % (60 * 60)) / 60);
//   if(days>=2){
//   	  return `${days}天前`;
//   }else if(days<2&&days>=1){
// 	  return `昨天${hours}:${minutes}`;
//   }else if(days<1){
// 	  return `${hours}小时前`;
//   }

//   // return `${days}天${hours}小时${minutes}分`;
// }
export const timeAgo = (timestamp) => {

    if (!isNaN(timestamp)) {
        // @ts-ignore
        timestamp = timestamp * 1000
    }
    const now = new Date();
    // @ts-ignore
    const diffMs = now - new Date(timestamp);
    const diffMins = Math.floor(diffMs / 1000 / 60);
    const diffHours = Math.floor(diffMins / 60);

    if (diffHours >= 24) {
        const diffDays = Math.floor(diffHours / 24);
        // @ts-ignore
        const date = new Date(timestamp)
        const y = date.getFullYear()
        const m = date.getMonth() + 1;
        const d = date.getDay()
        if ((y == now.getFullYear())) {
            return `${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
        }
        return `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
    }

    if (diffHours > 0) {
        return `${diffHours}小时前`;
    }

    return `${diffMins}分钟前`;
}

//处理次数
export const handlerCount = (count) => {
	if (count > 10000) {
		return (count / 10000).toFixed(1) + 'w';
	} else if (count > 1000) {
		return (count / 1000).toFixed(1) + 'k';
	} else {
		return count;
	}

}
export const getYear=(time)=>{
	const date=new Date(time);
	return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}