$(document).ready(function(){
    
    let right_answers = 0;

    // tietovisan toiminnallisuus:
    // kun valitaan yksi vastaus, se "lukitaan",
    // näytetään onko vastaus oikein vai väärin,
    // laskuri kertoo oikeiden vastausten lukumäärän
    $(".choice").click(function() {
        $(this).parent().addClass("selected");
        let name_attribuutti = $(this).attr("name");
        // color_c >> [name=color_c]
        let valinta = "[name=" + name_attribuutti + "]";
        $(valinta).prop("disabled", true);

        let esille = "#" + name_attribuutti;
        $(esille).removeClass("not_visible");
       
        let id = $(this).attr("id");
        let nimi = "[name=" + id + "]";
        $(nimi).removeClass("not_visible");

        let vastaus = Number($(this).val());

        if (vastaus === 1) {
            $(this).parent().addClass("right");
            right_answers += 1;
        } else {
            $(this).parent().addClass("wrong");
            let name_attribuutti = $(this).attr("name");
            let oikea_vastaus = "[name=" + name_attribuutti + "][value=1]";
            $(oikea_vastaus).parent().addClass("bold");
        }
        $("#kokTulos").html("Tuloksesi " + right_answers + "/5 oikein");
    });

   /**
    * Calculates the body mass index.
    * @param {number} height   height in cm
    * @param {number} weight   weight in kg
    * @returns {number}  body mass index
    */
   function getBmi(height, weight) {
       let bmi = (weight / Math.pow(height / 100, 2.5)) * 1.3;
       return bmi.toFixed(1);
   }

    /**
     * Calculate upper and lower bounds for the normal weight.
     * 
     * @param {Number} value    Person's height in cm.
     * @param {Number}  factor  18.5 >> lower boun, 24.9 >> upper bound
     * @returns {Number}        Normal weight bound as integer.
     */

     function getWeightLimit(value, factor) {
         let limit = (factor / 1.3) * Math.pow(value / 100, 2.5);
         return limit.toFixed(0);
     }

    // lasketaan painoindeksi ja tulostetaan tulokset
     $("#bmiButton").click(function(){
        let paino = Number($("#paino").val());
        let pituus = Number($("#pituus").val());

        let painoIndeksi = getBmi(pituus, paino);
        $("#bmi").html(painoIndeksi);

        if ($("#normalWeight").prop("checked")) {
            let min = getWeightLimit(pituus, 18.5);
            let max = getWeightLimit(pituus, 24.9);

            $("#min").html(min);
            $("#max").html(max);
        }
     });

     // kun osoitin kohdistetaan kenttiin joiden perusteella bmi lasketaan,
     // kenttä valitkoituu, edelliset tulokset tyhjennetään, painoindeksin selitykset
     // suljetaan ja valinta poistetaan sekä normaalipainon vaihteluvälin valinta 
     // tyhjennetään
     $(".bmiControl").focusin(function(){
        $(this).select();
        $("#bmi").html("");
        $("#min").html(min);
        $("#max").html(max);
        $(".bmiSelitys").removeClass("chosen");
        $("#bmiSelitys").removeClass("show");    
     });

     // asetetaan taustaväri painoindeksin mukaan oikealle listaelementille
     $("#selitys").click(function(){
        let indeksi = $("#bmi").html();
        if (indeksi < 17) {
            $("#bmi1").addClass("chosen");
        } else if (indeksi < 18.5) {
            $("#bmi2").addClass("chosen");
        } else if (indeksi < 25) {
            $("#bmi3").addClass("chosen");
        } else if (indeksi < 30) {
            $("#bmi4").addClass("chosen");
        } else if (indeksi < 35) {
            $("#bmi5").addClass("chosen");
        } else if (indeksi < 40) {
            $("#bmi6").addClass("chosen");
        } else {
            $("#bmi7").addClass("chosen");
        }
     });

     // luetaan vyötän mitta ja sukupuoli sekä valitaan niitä vastaava listaelementti
     $("#vyotaroB").click(function(){
        let waist = Number($("#vyotaro").val());
        let valinta = $("[name=sukupuoli]:checked").val();

        if (valinta === "male") {
            if (waist < 90) {
                $("#item1").addClass("chosen");
            } else if (waist <= 100) {
                $("#item2").addClass("chosen");
            } else {
                $("#item3").addClass("chosen");
            }
        } else {
            if (waist < 80) {
                $("#item1").addClass("chosen");
            } else if (waist <=90) {
                $("#item2").addClass("chosen");
            } else {
                $("#item3").addClass("chosen");
            }
        }
     });

     $("#vyotaro").focusin(function(){
        $(this).select();
        $(".vyotaroSelitys").removeClass("chosen");
     });

     $("[name=sukupuoli]").click(function(){
        $("#vyotaro").focus();
     });

});