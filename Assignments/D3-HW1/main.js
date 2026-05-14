    //Set up dimensions
        const margin = 30;
        const width = 500;
        const height = 500;


    //Load data
        d3.csv("gaming_hours.csv").then(data => {
        //Convert hours to numbers
        data.forEach(d => {
            d.hours = +d.hours;
        });

        const maxY = d3.max(data, d => d.hours);


    //Set up scales
        const xScale = d3.scaleBand()
                        .domain(data.map(d => d.day))
                        .range([margin, width - margin])
                        .paddingInner(.02);

        const yScale = d3.scaleLinear()
                        .domain([0, maxY])
                        .range([height - margin, margin]);


    //Make the SVG
        const svg = d3.select("body")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);


    //Set up axes
        const bottomAxis = d3.axisBottom()
                             .scale(xScale);

        const leftAxis = d3.axisLeft()
                           .scale(yScale);


    //Draw bars
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.day))
            .attr("y", d => yScale(d.hours))
            .attr("width", xScale.bandwidth())
            .attr("height", d => (height - margin) - yScale(d.hours))
            .attr("fill", "darkgreen");


    //Add axes to SVG
        svg.append("g")
            .attr("transform", "translate(0," + (height - margin) + ")")
            .call(bottomAxis);

        svg.append("g")
            .attr("transform", "translate(" + margin + ",0)")
            .call(leftAxis);


    });
