import React from "react";
import Header from "../components/faqsHeader";
import Footer from "../components/footer";
import {
    Container,
    Card, CardHeader, CardBody,
    Collapse
} from "reactstrap";
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Faqs extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: 0, cards: [1, 2, 3, 4, 5] };
      }
  
      toggle(e) {
        let event = e.target.dataset.event;
        this.setState({ collapse: this.state.collapse === Number(event) ? 0 : Number(event) });
      }

    render(){
        const {collapse} = this.state;

        return(
            <>
            <Header></Header>
             <main>
                <Container className="faqs">
                    <Card key="1">
                        <CardHeader onClick={this.toggle} data-event="1">Q1: What are the Sustainable Development Goals?
                        {
                            collapse === 1 ? (
                                <FontAwesomeIcon onClick={this.toggle} data-event="1" icon="caret-up" className="faq-icon icon-opened"></FontAwesomeIcon>
                            ):(
                                <FontAwesomeIcon onClick={this.toggle} data-event="1" icon="caret-down" className="faq-icon icon-closed"></FontAwesomeIcon>
                            )
                        }
                        </CardHeader>
                        <Collapse isOpen={collapse === 1}>
                        <CardBody>
                            <p>A: The 17 SDGs are universal goals that were adopted by all member states of the 
                                United Nations in 2015 to guide international collaboration towards sustainable 
                                development. They follow the Millennium Development Goals, and aim to end poverty, 
                                tackle inequality, protect the planet, promote peace, and ensure prosperity for all. 
                                Each goal has specific targets to be achieved before 2030. See the <a href="https://www.un.org/sustainabledevelopment/sustainable-development-goals/" target="_blank"> UN website </a> for more 
                                information about the SDGs. </p>
                        </CardBody>
                        </Collapse>
                    </Card>
                    <Card key="2">
                        <CardHeader onClick={this.toggle} data-event="2">Q2: Why develop an Africa SDG Index and Dashboards?
                        {
                            collapse === 2 ? (
                                <FontAwesomeIcon onClick={this.toggle} data-event="2" icon="caret-up" className="faq-icon icon-opened"></FontAwesomeIcon>
                            ):(
                                <FontAwesomeIcon onClick={this.toggle} data-event="2" icon="caret-down" className="faq-icon icon-closed"></FontAwesomeIcon>
                            )
                        }
                        </CardHeader>
                        <Collapse isOpen={collapse === 2}>
                        <CardBody>
                            <p> A: The Africa SDG Index aggregates available data on all SDGs into a composite index to provide
                                countries with a quick assessment of how they are performing relative to their peers. In this way
                                the Africa SDG Index can help draw attention to the SDGs and their role as a tool for guiding
                                national policies and long-term strategies for sustainable development. Its purpose is not to
                                compare countries with vastly different development status, but to allow countries to benchmark
                                themselves using a single holistic measure that encompasses all SDGs and treats each goal equally.
                                Just like the SDG Dashboards, the Africa SDG Index is designed to support national discussions on
                                operationalizing the SDGs instead of monitoring progress towards achieving the goals.
                                <br></br><br></br>

                                More than any other region in the world, Africa faces substantial challenges in 
                                achieving the SDGs. The 2018 Africa SDG Index and Dashboards present an analysis of 
                                African countries’ current situation towards achieving the SDGs. Overall, according to this 
                                Dashboard, the goal areas facing the steepest challenges are health (SDG 3), infrastructure 
                                (SDG 9), and peace, justice, and strong institutions (SDG 16) with more than 80% of countries 
                                scoring red. Food security and sustainable agriculture (SDG 2), energy access (SDG 7), 
                                and marine ecosystems (SDG 14) are also big challenges that need to be prioritized as around 70%
                                 of the countries scored red in these areas. For 14 of the 17 goals, not a single African 
                                 country has achieved green status, according to the Dashboard’s system of color-coding. 
                                 For the remaining three goals, there are only a handful of green countries—climate action 
                                 (SDG 13) has five greens, and terrestrial ecosystems (SDG 15) and sustainable consumption 
                                 and production (SDG 12) have three and two greens, respectively. </p>
                        </CardBody>
                        </Collapse>
                    </Card>
                    <Card key="3">
                        <CardHeader onClick={this.toggle} data-event="3">Q3: Do the Africa SDG Index and Dashboards replace or compete with official SDG monitoring?
                        {
                            collapse === 3 ? (
                                <FontAwesomeIcon onClick={this.toggle} data-event="3" icon="caret-up" className="faq-icon icon-opened"></FontAwesomeIcon>
                            ):(
                                <FontAwesomeIcon onClick={this.toggle} data-event="3" icon="caret-down" className="faq-icon icon-closed"></FontAwesomeIcon>
                            )
                        }
                        </CardHeader>
                        <Collapse isOpen={collapse === 3}>
                        <CardBody>
                            <p>A: No. The Africa SDG Index and Dashboards are preliminary analytical tools to help governments and
                                other stakeholders take stock of where they currently stand with regards to achieving the SDGs and
                                to identify priorities for early action. As new data become available they will be included in the
                                SDG Index and Dashboards, which will be published on an annual basis for the next three years.
                                Simultaneously, countries will need to develop a full suite of monitoring systems to track the SDG
                                metrics recommended by the UN Statistical Commission. This will require major investments in
                                statistical capacity development, particularly in poorer countries or those with low statistical
                                capacity. Over time every country should be able to track critical SDG variables to monitor progress
                                towards achieving the goals. </p>
                        </CardBody>
                        </Collapse>
                    </Card>
                    <Card key="4">
                        <CardHeader onClick={this.toggle} data-event="4">
                        Q4: How have indicators been selected for the Africa Index and Dashboards? Why are
                            they not identical to the recently proposed official SDG Indicators?
                            {
                            collapse === 4 ? (
                                <FontAwesomeIcon onClick={this.toggle} data-event="4" icon="caret-up" className="faq-icon icon-opened"></FontAwesomeIcon>
                            ):(
                                <FontAwesomeIcon onClick={this.toggle} data-event="4" icon="caret-down" className="faq-icon icon-closed"></FontAwesomeIcon>
                            )
                        }
                        </CardHeader>
                        <Collapse isOpen={collapse === 4}>
                        <CardBody>
                            <p> A: In early 2016, the UN Statistical Commission recommended several indicators for measuring the
                                progress towards the SDGs, which in April 2017 reached 232 indicators and was endorsed by the UN
                                Statistical Commission. Yet for most countries data remain unavailable for the vast majority of
                                these proposed indicators. It will take time and investments in statistical capacity to build up
                                national data systems so that every country can monitor progress against the official indicators
                                (see also recommendations by the Expert Group on SDG Indicators). Meanwhile, countries need to start
                                the process of operationalizing and implementing the SDGs using data available today.<br></br>

                                The Africa SDG Index was built on a set of indicators for each of the 17 SDGs using the most recent
                                published data. We considered each of the 232 SDG indicators (IAEG-SDGs, 2016) proposed by the
                                Inter-Agency and Expert Group on SDG Indicators and endorsed by the UN Statistical Commission, and
                                included those that met five criteria. Some official SDG indicators met the five criteria but could
                                not be included as they did not permit a ranking of countries or the definition of a quantitative
                                threshold signifying achievement of the goals applicable to all countries. For example, different
                                countries specialize in different sectors of the economy, so there is no “right” threshold of
                                manufacturing as a share of GDP for which all countries should aim. While individual countries may
                                find the share of manufacturing value added highly useful for developing long-term strategies for
                                industrialization, it is not possible to define a common threshold for the SDGs. Other official SDG
                                indicators are similarly useful at the country level but cannot serve as a yardstick for comparing
                                countries’ performance internationally. Where official SDG indicators did not meet the criteria for
                                data selection or where indicator gaps remained, we considered official and other metrics published
                                in peer-reviewed literature, as well as major databases and reports on development and environmental
                                indicators. Owing to limited data availability and a lack of metrics for key SDG priorities,
                                particularly education and inequality, this report is still an incomplete picture. As data
                                availability improves and new estimation techniques become available, subsequent editions of the
                                Africa SDG Index and Dashboard may include additional variables.<br></br>

                                For this first edition, we were able to include 97 indicators from a broad range of data sources, 28
                                of which are Africa-specific, including indicators from the A2063 ten-year implementation plan. The
                                revised set of indicators includes new indicators and revisions to fill gaps and to better align the
                                SDG Index and Dashboards with the monitoring needs of African states. The Africa SDG Index comprises
                                51 of the 54 African member states of the UN. </p>
                        </CardBody>
                        </Collapse>
                    </Card>
                    <Card key="5">
                        <CardHeader onClick={this.toggle} data-event="5">Q5: Why are some countries not included in the Africa SDG Index?
                        {
                            collapse === 5 ? (
                                <FontAwesomeIcon onClick={this.toggle} data-event="5" icon="caret-up" className="faq-icon icon-opened"></FontAwesomeIcon>
                            ):(
                                <FontAwesomeIcon onClick={this.toggle} data-event="5" icon="caret-down" className="faq-icon icon-closed"></FontAwesomeIcon>
                            )
                        }
                        </CardHeader>
                        <Collapse isOpen={collapse === 5}>
                        <CardBody>
                            <p>A: A country is included in the Africa SDG Index if it has data for at least 80% of the indicators.
                                Some countries with a population of less than one million have sufficient data and are therefore
                                included in the Africa SDG Index, despite the indicator selection criteria of 80% data availability
                                in countries with a population above one million. The fact that some countries lack sufficient data
                                for inclusion in the Africa SDG Index underscores the need for greater investments in statistical
                                capacity building. </p>
                        </CardBody>
                        </Collapse>
                    </Card>
                    <Card key="6">
                        <CardHeader onClick={this.toggle} data-event="6">Q6: Do the Africa SDG Index and Dashboards replace or compete with official SDG monitoring?
                        {
                            collapse === 6 ? (
                                <FontAwesomeIcon onClick={this.toggle} data-event="6" icon="caret-up" className="faq-icon icon-opened"></FontAwesomeIcon>
                            ):(
                                <FontAwesomeIcon onClick={this.toggle} data-event="6" icon="caret-down" className="faq-icon icon-closed"></FontAwesomeIcon>
                            )
                        }
                        </CardHeader>
                        <Collapse isOpen={collapse === 6}>
                        <CardBody>
                            <p>A: No. The Africa SDG Index and Dashboards are preliminary analytical tools to help governments and
                                other stakeholders take stock of where they currently stand with regards to achieving the SDGs and
                                to identify priorities for early action. As new data become available they will be included in the
                                SDG Index and Dashboards, which will be published on an annual basis for the next three years.
                                Simultaneously, countries will need to develop a full suite of monitoring systems to track the SDG
                                metrics recommended by the UN Statistical Commission. This will require major investments in
                                statistical capacity development, particularly in poorer countries or those with low statistical
                                capacity. Over time every country should be able to track critical SDG variables to monitor progress
                                towards achieving the goals. </p>
                        </CardBody>
                        </Collapse>
                    </Card>
                    <Card key="7">
                        <CardHeader onClick={this.toggle} data-event="7">Q7: Where do the data for the Africa SDG Index and Dashboards come from?
                        {
                            collapse === 7 ? (
                                <FontAwesomeIcon onClick={this.toggle} data-event="7" icon="caret-up" className="faq-icon icon-opened"></FontAwesomeIcon>
                            ):(
                                <FontAwesomeIcon onClick={this.toggle} data-event="7" icon="caret-down" className="faq-icon icon-closed"></FontAwesomeIcon>
                            )
                        }
                        </CardHeader>
                        <Collapse isOpen={collapse === 7}>
                        <CardBody>
                            <p>A: To the greatest extent possible, the Africa SDG Index and Dashboards rely on internationally
                    comparable official statistics. In order to fill in some gaps in the official data, non-official
                    metrics from other reputable sources have been used, as described in the <a href="https://unstats.un.org/sdgs/metadata/" target="_blank">online metadata. </a>  Data for
                    each indicator have been rigorously selected and reviewed for quality, timeliness and verifiability.</p>
                        </CardBody>
                        </Collapse>
                    </Card>
                    <Card key="8">
                        <CardHeader onClick={this.toggle} data-event="8">Q8: How do the Index and Dashboards compare performance across different
                             indicators?
                             {
                            collapse === 8 ? (
                                <FontAwesomeIcon onClick={this.toggle} data-event="8" icon="caret-up" className="faq-icon icon-opened"></FontAwesomeIcon>
                            ):(
                                <FontAwesomeIcon onClick={this.toggle} data-event="8" icon="caret-down" className="faq-icon icon-closed"></FontAwesomeIcon>
                            )
                        }
                        </CardHeader>
                        <Collapse isOpen={collapse === 8}>
                        <CardBody>
                            <p>A: To ensure comparability we normalize the data for each indicator by transforming it linearly into
                            a scale from 0 to 100. A value of 100 denotes the technical optimum, while a value of zero denotes
                            the 2.5th percentile in the distribution. For clarity and ease of interpretation, we transform some
                            indicators so that in each case a higher score on the normalized indicator corresponds to a higher
                            overall progress. </p>
                        </CardBody>
                        </Collapse>
                    </Card>
                    <Card key="9">
                        <CardHeader onClick={this.toggle} data-event="9">Q9:  How are the SDGs and the indicators weighted?
                        {
                            collapse === 9 ? (
                                <FontAwesomeIcon onClick={this.toggle} data-event="9" icon="caret-up" className="faq-icon icon-opened"></FontAwesomeIcon>
                            ):(
                                <FontAwesomeIcon onClick={this.toggle} data-event="9" icon="caret-down" className="faq-icon icon-closed"></FontAwesomeIcon>
                            )
                        }
                        </CardHeader>
                        <Collapse isOpen={collapse === 9}>
                        <CardBody>
                            <p>A: Each SDG has the same weight in the Index and Dashboards, which is in line with the spirit of the
                                SDGs adopted in September 2015. This implies that countries need to pursue all 17 goals through
                                integrated strategies. Within each goal every indicator is equally weighted, which implies that
                                every indicator is weighted inversely to the number of indicators available for that particular SDG.
                                An advantage of this approach is that as more and better data become available, new variables can
                                easily be added to individual SDGs without changing the relative weighting of the goals. In this way
                                the Africa SDG Index and Dashboards can evolve over time as each epistemic community generates new
                                and better data.</p>
                        </CardBody>
                        </Collapse>
                    </Card>
                    <Card key="10">
                        <CardHeader onClick={this.toggle} data-event="10">Q10: How to interpret the Africa SDG Dashboards?
                        {
                            collapse === 10 ? (
                                <FontAwesomeIcon onClick={this.toggle} data-event="10" icon="caret-up" className="faq-icon icon-opened"></FontAwesomeIcon>
                            ):(
                                <FontAwesomeIcon onClick={this.toggle} data-event="10" icon="caret-down" className="faq-icon icon-closed"></FontAwesomeIcon>
                            )
                        }
                        </CardHeader>
                        <Collapse isOpen={collapse === 10}>
                        <CardBody>
                            <p>A: Some other indices use relative performance across countries to define thresholds. We believe that
                    absolute thresholds are more suitable since most SDGs require absolute benchmarks to be achieved. To
                    assess a country’s progress on a particular indicator, such absolute quantitative thresholds are
                    introduced to differentiate between situations where an SDG threshold has been met (green), where
                    significant challenges remain (yellow & orange), and where major challenges must be overcome if the
                    country is to meet the goal (red). Where possible, these thresholds are derived from the SDGs, their
                    targets, or other official sources. All thresholds are specified in the online metadata.</p>
                        </CardBody>
                        </Collapse>
                    </Card>
                    <Card key="11">
                        <CardHeader onClick={this.toggle} data-event="11">Q11: How are the Africa SDG Index and Dashboards scores calculated and what
                            aggregation method is used?
                            {
                            collapse === 11 ? (
                                <FontAwesomeIcon onClick={this.toggle} data-event="11" icon="caret-up" className="faq-icon icon-opened"></FontAwesomeIcon>
                            ):(
                                <FontAwesomeIcon onClick={this.toggle} data-event="11" icon="caret-down" className="faq-icon icon-closed"></FontAwesomeIcon>
                            )
                        }
                        </CardHeader>
                        <Collapse isOpen={collapse === 11}>
                        <CardBody>
                            <p>A: A: The choice of aggregation formula can have important implications for the results of both the
                                Africa SDG Index and Dashboards. Taking a simple average of indicator values (arithmetic
                                aggregation) implies that the indicators are perfectly substitutable: progress on one variable can
                                offset lack of progress on another. This approach is reasonable for indicators within the same goal
                                that tend to complement one another, so we use arithmetic means to aggregate indicators within each
                                SDG for the Index and Dashboards.<br></br>

                                However, major trade-offs may occur across SDGs. Progress on one goal (e.g. higher economic growth)
                                cannot fully offset lack of progress on another (e.g. rising inequality or environmental
                                degradation). For this reason countries need to make progress towards every goal. In other words,
                                one must assume limited substitutability across goals, which is commonly done by using the geometric
                                mean. As a result, one could argue for using the geometric average of the scores for each SDG to
                                compute the overall Africa SDG Index.<br></br>

                                Nevertheless, the two methods of aggregation give almost the same rankings and nearly the same
                                scores for most countries. For simplicity, we therefore use the arithmetic aggregation even though
                                the geometric aggregation is conceptually attractive. This leaves a natural interpretation of the
                                meaning of the national Africa SDG Index score. An Africa SDG Index value (e.g. 66) therefore means
                                that the country is a certain percentage (e.g. 66%) of the way from the worst to the best score on
                                average across the 17 SDGs.<br></br>
                                A third method for aggregating indicator scores is the Leontief minimum function, which ascribes the
                                value of the indicator on which the country performs worst as the score for the SDG. This
                                aggregation is helpful for identifying the areas within each goal where a country needs to make the
                                greatest progress but is too “tough” an approach to allow comparison of countries.<br></br>

                                For the Africa SDG Dashboards, we use the average of the two worst performing indicators to assign
                                colors to SDGs.. To score “red”, both worst performing indicators must be “red”. To achieve “green”,
                                all indicators under the goal must be “green”. If the average rating falls in the “caution lane”,
                                the SDG is assigned “yellow” or “orange”, depending on how far along the country is on the path from
                                “red” to “green.” </p>
                        </CardBody>
                        </Collapse>
                    </Card>
                    <Card key="12">
                        <CardHeader onClick={this.toggle} data-event="12">Q12: How do the Africa SDG Index and Dashboards deal with missing data?
                        {
                            collapse === 12 ? (
                                <FontAwesomeIcon onClick={this.toggle} data-event="12" icon="caret-up" className="faq-icon icon-opened"></FontAwesomeIcon>
                            ):(
                                <FontAwesomeIcon onClick={this.toggle} data-event="12" icon="caret-down" className="faq-icon icon-closed"></FontAwesomeIcon>
                            )
                        }
                        </CardHeader>
                        <Collapse isOpen={collapse === 12}>
                        <CardBody>
                            <p>A: The Africa SDG Index and Dashboards do not model or extrapolate data at the indicator level to
                                fill gaps because such extrapolations are prone to errors. However, for the purposes of calculating
                                countries’ total index scores, we impute average regional goal scores for those countries that have
                                no data under a goal. This applies primarily to goal 10 (Reduced Inequalities) and goal 14 (Life
                                Below Water). Still, they are presented as missing data in the country profiles. At this stage in
                                the implementation of the SDGs we also want to highlight data gaps so as to encourage governments
                                and the international system to fill them. There are few exceptions where data were imputed for
                                entire groups of countries (sub regions).</p>
                        </CardBody>
                        </Collapse>
                    </Card>
                    <Card key="13">
                        <CardHeader onClick={this.toggle} data-event="13">Q13: How do you estimate trends?
                        {
                            collapse === 13 ? (
                                <FontAwesomeIcon onClick={this.toggle} data-event="13" icon="caret-up" className="faq-icon icon-opened"></FontAwesomeIcon>
                            ):(
                                <FontAwesomeIcon onClick={this.toggle} data-event="13" icon="caret-down" className="faq-icon icon-closed"></FontAwesomeIcon>
                            )
                        }
                        </CardHeader>
                        <Collapse isOpen={collapse === 13}>
                        <CardBody>
                            <p>A: Using historic data, we estimate how fast a country has been progressing towards an SDG and determine
                                whether – if continued into the future – this pace will be sufficient to achieve the SDG by 2030.
                                For each indicator, SDG achievement is defined by the green threshold set for the SDG Dashboards.
                                The difference in percentage points between the green threshold and the normalized country score
                                denotes the gap that must be closed to meet that goal. To estimate SDG trends, we calculated the
                                linear annual growth rates (i.e. annual percentage improvements) needed to achieve the goal by 2030
                                (i.e. 2010-2030) which we compared to the average annual growth rate over the most recent period
                                (usually 2010-2015). Progress towards goal achievement on a particular indicator is described using
                                a 5-arrow system.<br></br>

                                To estimate overall trends for an SDG, each indicator trend for that SDG was re-normalized on a
                                linear scale from 0-4. The trend for an SDG was calculated as the arithmetic average of all trend
                                indicators for that goal. An average between 0-1 corresponds to a “decreasing” goal trend, between
                                1-2 to a “stagnating” goal trend, 2-3 “moderately improving goal trend”, 3-4 “on track” goal trend.
                                Maintaining SDG achievement corresponds to a normalized score of exactly 3. Trends are reported at
                                the SDG level only if trend data were available for at least 75% of Africa SDG Dashboards indicators
                                under that goal. SDG Trends are based on data points that precede the adoption of SDGs, because data
                                is reported with long lags at the international level due to lengthy validation processes. Over
                                time, we will update the data to use 2015 as baseline year for SDG Trends.<br></br>

                                Trends indicators were selected from among the indicators included in the Africa SDG Dashboards
                                based on the availability of trend data. When the value for one year was not available we used the
                                closest available value with a maximum of one-year difference.<br></br>

                                Several other calculation methods were considered. For instance, we tested the sensitivity of the
                                results when using technical optimums (100 score) as “goal achievement” and calculate distance to
                                technical optimums. This approach yielded harsher results and is not consistent with our conceptual
                                assumption that lower green thresholds correspond to goal achievement. We also considered using
                                compound annual growth rates (CAGR) instead of linear growth rates. The two approaches yield rather
                                similar results and we could not identify a strong argument for using the more sophisticated CAGR
                                method. Finally, while the dashboards are based only on the two-worst indicators trends are
                                generated using all indicators under the goal. This is because the dashboards aim to highlight goals
                                where particular attention is required due to very poor performance on some of the underlying
                                indicators whereas trends aim to reflect insights on the overall goal evolution including all
                                indicators. </p>
                        </CardBody>
                        </Collapse>
                    </Card>
                    <Card key="14">
                        <CardHeader onClick={this.toggle} data-event="14">Q14: How does the trend analysis deal with countries that have already met a SDG
                             target?
                             {
                            collapse === 14 ? (
                                <FontAwesomeIcon onClick={this.toggle} data-event="14" icon="caret-up" className="faq-icon icon-opened"></FontAwesomeIcon>
                            ):(
                                <FontAwesomeIcon onClick={this.toggle} data-event="14" icon="caret-down" className="faq-icon icon-closed"></FontAwesomeIcon>
                            )
                        }
                        </CardHeader>
                        <Collapse isOpen={collapse === 14}>
                        <CardBody>
                            <p>A:Our methodology ignores movements (both positive and negative) which are above goal achievement
                                (the green threshold). Conceptually, our objective is to show how much countries are progressing
                                towards reaching the goals. Therefore, a country above the green threshold and that maintained its
                                performance above the green threshold is automatically considered as having maintained performance
                                above goal achievement. At the goal level, this arrow is only given when all of a countries’ trend
                                indicators have maintained performance above their respective green thresholds. </p>
                        </CardBody>
                        </Collapse>
                    </Card>
                    <Card key="15">
                        <CardHeader onClick={this.toggle} data-event="15">Q15: Morocco is ranked number 1 in the Africa SDG Index. Does this mean the country
                            has achieved all the SDGs?
                            {
                            collapse === 15 ? (
                                <FontAwesomeIcon onClick={this.toggle} data-event="15" icon="caret-up" className="faq-icon icon-opened"></FontAwesomeIcon>
                            ):(
                                <FontAwesomeIcon onClick={this.toggle} data-event="15" icon="caret-down" className="faq-icon icon-closed"></FontAwesomeIcon>
                            )
                        }
                        </CardHeader>
                        <Collapse isOpen={collapse === 15}>
                        <CardBody>
                            <p>A: Absolutely not. While Morocco performs best on average based on the data we were able to mobilize
                                for the SDG Index. The SDG Dashboards makes clear that every country faces major challenges in
                                achieving the SDGs. This applies equally to Morocco and other top-ranking countries.</p>
                        </CardBody>
                        </Collapse>
                    </Card>
                    <Card key="16">
                        <CardHeader onClick={this.toggle} data-event="16">Q16: How does the Africa SDG Index relate to other development indices for the SDGs?
                        {
                            collapse === 16 ? (
                                <FontAwesomeIcon onClick={this.toggle} data-event="16" icon="caret-up" className="faq-icon icon-opened"></FontAwesomeIcon>
                            ):(
                                <FontAwesomeIcon onClick={this.toggle} data-event="16" icon="caret-down" className="faq-icon icon-closed"></FontAwesomeIcon>
                            )
                        }
                        </CardHeader>
                        <Collapse isOpen={collapse === 16}>
                        <CardBody>
                            <p>A: Many other composite development indices exist, but we are not aware of one tracking all 17 SDGs
                                at the country level. In 2015, the Bertelsmann Stiftung issued a report, which was the first to
                                develop an index for OECD countries to track SDG achievement and determine priorities for
                                implementation in each country. Another significant effort has been undertaken by the Overseas
                                Development Institute, which presents a regional SDG Scorecard, projecting trends across key
                                dimensions of the SDGs to determine areas in which the fastest acceleration of progress will be
                                required. The Africa SDG Index and Dashboards, however, provides a comprehensive global index to
                                track the implementation of the SDGs. </p>
                        </CardBody>
                        </Collapse>
                    </Card>
                    <Card key="17">
                        <CardHeader onClick={this.toggle} data-event="17">Q17: How can I access the data for my country or region?
                        {
                            collapse === 17 ? (
                                <FontAwesomeIcon onClick={this.toggle} data-event="17" icon="caret-up" className="faq-icon icon-opened"></FontAwesomeIcon>
                            ):(
                                <FontAwesomeIcon onClick={this.toggle} data-event="17" icon="caret-down" className="faq-icon icon-closed"></FontAwesomeIcon>
                            )
                        }
                        </CardHeader>
                        <Collapse isOpen={collapse === 17}>
                        <CardBody>
                            <p>A: Country profiles and data are available for download in this website. The data will be updated
                                each year.
                            </p> 
                        </CardBody>
                        </Collapse>
                    </Card>
                    <Card key="18">
                        <CardHeader onClick={this.toggle} data-event="18">Q18: What are the major data limitations?
                        {
                            collapse === 18 ? (
                                <FontAwesomeIcon onClick={this.toggle} data-event="18" icon="caret-up" className="faq-icon icon-opened"></FontAwesomeIcon>
                            ):(
                                <FontAwesomeIcon onClick={this.toggle} data-event="18" icon="caret-down" className="faq-icon icon-closed"></FontAwesomeIcon>
                            )
                        }
                        </CardHeader>
                        <Collapse isOpen={collapse === 18}>
                        <CardBody>
                            <p>A: As explained in the report, the lack of data in some areas leaves significant gaps in the
                                analysis. In addition, the Africa SDG Dashboards do not capture important regional challenges that
                                are less relevant at the global level, such as neglected tropical diseases, malaria, or inequality
                                in education outcomes. Similarly, no globally available data could be found to track the impact a
                                country might have on SDG achievement in another country (e.g. by sourcing natural resources from
                                abroad). These challenges require careful analysis and will be addressed in later versions of the
                                Africa SDG Index and Dashboards. </p>
                        </CardBody>
                        </Collapse>
                    </Card>
                    <Card key="19">
                        <CardHeader onClick={this.toggle} data-event="19">Q19: When will the Africa SDG Index and Dashboards be updated?
                        {
                            collapse === 19 ? (
                                <FontAwesomeIcon onClick={this.toggle} data-event="19" icon="caret-up" className="faq-icon icon-opened"></FontAwesomeIcon>
                            ):(
                                <FontAwesomeIcon onClick={this.toggle} data-event="19" icon="caret-down" className="faq-icon icon-closed"></FontAwesomeIcon>
                            )
                        }
                        </CardHeader>
                        <Collapse isOpen={collapse === 19}>
                        <CardBody>
                            <p>A: The Africa SDG Index and Dashboards will be updated annually to include new indicators as they
                                    become available, update the data, and incorporate suggestions on how to make the tools more useful
                                    for countries and other stakeholders. The website will be continuously improved to facilitate the
                                    real-time use of the data and comparisons across countries.</p>
                        </CardBody>
                        </Collapse>
                    </Card>
                    <Card key="20">
                        <CardHeader onClick={this.toggle} data-event="20">Q20: To whom can I address my comments on the Africa SDG Index and Dashboards?
                        {
                            collapse === 20 ? (
                                <FontAwesomeIcon onClick={this.toggle} data-event="20" icon="caret-up" className="faq-icon icon-opened"></FontAwesomeIcon>
                            ):(
                                <FontAwesomeIcon onClick={this.toggle} data-event="20" icon="caret-down" className="faq-icon icon-closed"></FontAwesomeIcon>
                            )
                        }
                        </CardHeader>
                        <Collapse isOpen={collapse === 20}>
                        <CardBody>
                            <p>A: A: We welcome comments and suggestions for improving the Africa SDG Index and Dashboards. Please
                    address your comments and suggestions to <a href="mailto:africasdgindex@sdgcafrica.org">africasdgindex@sdgcafrica.org </a>
                    or <a href="mailto:africa@sdgindex.org">africa@sdgindex.org </a>.</p>
                        </CardBody>
                        </Collapse>
                    </Card>
                    
                </Container>
            </main>
            <Footer></Footer>
            </>
        )
    }
}

export default Faqs;