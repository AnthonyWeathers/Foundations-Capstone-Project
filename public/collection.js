let dataShown = false

const fetchData = () => {
    axios.get(`http://localhost:8765/getList`)
        .then(res => { // works but does not show blank spots for missing fortunes
            // Assuming data is an array of items
            //console.log(res.data[0])
            let listItems = res.data.map(function(item) { 
                return "<li>" + item.fortune + "</li>"; // item is each fortune object containing the fortune
            }).join(""); // Join array elements into a string

            // Update HTML content with fetched data as a list
            let dataList = document.getElementById("dataList");
            if (!dataList) {
                dataList = document.createElement("ul");
                dataList.id = "dataList";
                document.getElementById("dataContainer").appendChild(dataList);
            }
            // Populate the list with the new data
            dataList.innerHTML = listItems;
        })
        .catch(function(error) {
            console.error("Error fetching data:", error);
        });
}

const toggleData = () => {
    if (!dataShown) {
        fetchData(); // Fetch data if not already fetched
        document.getElementById("dataContainer").style.display = "block"; // Show data container
        dataShown = true;
    } else {
        document.getElementById("dataContainer").style.display = "none"; // Hide data container
        dataShown = false;
    }
}

document.getElementById("toggleDataBtn").addEventListener("click", () => {
    toggleData(); // Toggle data visibility
})