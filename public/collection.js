let dataShown = false

const fetchData = () => {
    axios.get(`http://localhost:8765/getList`)
        .then(res => {
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

fetchData()