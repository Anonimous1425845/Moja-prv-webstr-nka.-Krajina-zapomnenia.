document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    const jsonString = JSON.stringify(data,null,2);

    const blob = new Blob([jsonString], { type: "application/json" });
    
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "bro.json";
    link.click();
        
    URL.revokeObjectURL(link.href);
});