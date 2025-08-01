document.addEventListener("DOMContentLoaded", () => {
  const form         = document.getElementById("filter-form");
  const tableBody    = document.getElementById("table-body");
  const filterBtn    = document.getElementById("filter-btn");
  const resetBtn     = document.getElementById("reset-btn");

  // Grab inputs by matching IDs
  const orderInput    = document.getElementById("filter-order");
  const customerInput = document.getElementById("filter-customer");
  const productInput  = document.getElementById("filter-product");

  const fetchData = async (filters = {}) => {
    try {
      const params   = new URLSearchParams(filters);
      const response = await fetch(`/api/dashboard?${params.toString()}`);
      const data     = await response.json();

      tableBody.innerHTML = "";

      if (!Array.isArray(data) || data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8">No data found</td></tr>`;
        return;
      }

      // Build rows with highlight
      const highlighted = [];
      const normal      = [];

      data.forEach(row => {
        const tr = document.createElement("tr");
        const isMatch =
          (!filters.customer || filters.customer == String(row.customer_id)) &&
          (!filters.order    || filters.order    == String(row.order_id)) &&
          (!filters.product  || row.product_name.toLowerCase().includes(filters.product.toLowerCase()));

        tr.innerHTML = `
          <td>${row.customer_name}</td>
          <td>${row.customer_country}</td>
          <td>${row.order_id}</td>
          <td>${new Date(row.order_date).toLocaleDateString()}</td>
          <td>${row.product_name}</td>
          <td>${row.quantity}</td>
          <td>$${parseFloat(row.total_price).toFixed(2)}</td>
          <td>${row.stock_quantity}</td>
        `;

        if (isMatch && Object.keys(filters).length > 0) {
          tr.classList.add("highlight");
          highlighted.push(tr);
        } else {
          normal.push(tr);
        }
      });

      // Append highlighted rows first
      [...highlighted, ...normal].forEach(tr => tableBody.appendChild(tr));
    } catch (err) {
      console.error("Fetch error:", err);
      tableBody.innerHTML = `<tr><td colspan="8">Failed to load data</td></tr>`;
    }
  };

  // Initial load
  fetchData();

  // Filter button (form submit)
  filterBtn.addEventListener("click", e => {
    e.preventDefault();
    const filters = {};
    if (orderInput.value.trim())    filters.order    = orderInput.value.trim();
    if (customerInput.value.trim()) filters.customer = customerInput.value.trim();
    if (productInput.value.trim())  filters.product  = productInput.value.trim();
    fetchData(filters);
  });

  // Reset button
  resetBtn.addEventListener("click", () => {
    orderInput.value    = "";
    customerInput.value = "";
    productInput.value  = "";
    fetchData(); // reload all data
  });

  // OPTIONAL: Load analytics chart
  fetch("/api/analytics/sales")
    .then(res => res.json())
    .then(data => {
      const ctx = document.getElementById("sales-chart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.map(r => r.month),
          datasets: [{
            label: "Total Sales (USD)",
            data: data.map(r => r.total_sales),
            backgroundColor: "#70a1ff"
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: "Monthly Sales Overview"
            }
          }
        }
      });
    })
    .catch(err => console.error("Failed to load chart data:", err));
});
