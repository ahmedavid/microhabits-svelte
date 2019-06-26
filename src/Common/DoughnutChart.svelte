<script>
  import { onMount,afterUpdate } from "svelte";
  export let goal;
  export let count;
  export let name;
  let chart = null;

  onMount(() => {
    drawChart();
  });

  afterUpdate(() => {
    drawChart();
  });

  function drawChart(){
    const donePercent = Math.round(count/goal*100);
    const tobeDonePercent = Math.round((goal-count)/goal*100);
    const ctx = document.getElementById("exercise" + name).getContext("2d");
    chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [donePercent, tobeDonePercent],
            backgroundColor: ["#28a745"],
            borderColor: ["#28a745"],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        cutoutPercentage: 80,
        elements: {
          arc: {
            roundedCornersFor: 0
          },
          center: {
            // the longest text that could appear in the center
            maxText: goal,
            text: donePercent + "%",
            fontColor: "#FF6684",
            fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            fontStyle: "normal",
            fontSize: 48,
            // if a fontSize is NOT specified, we will scale (within the below limits) maxText to take up the maximum space in the center
            // if these are not specified either, we default to 1 and 256
            minFontSize: 1,
            maxFontSize: 256
          }
        }
      }
    });
  }
</script>

<canvas id={"exercise" + name} width="150px" height="150px" />

<style>
  .myChart {
    margin: 0;
    padding: 0;
  }
</style>
