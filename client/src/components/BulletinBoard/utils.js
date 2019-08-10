const Utils = {
    getDateFormat: (d) => {
        let date = new Date(d);
        let dateString = date.toLocaleDateString();
        return dateString;
    },
};
  
export default Utils;