var file_contents1 = file_data1.prompt;
var openai_data11 = window.openai_data11 || {};
var tense = "live segment"; // Default tense
var whatTense = "present tense";
var previousResponseArray = [];
const textarea = document.getElementById("prompt");

jQuery(document).ready(function($) {
  var cacheCounter = 0; // Initialize the counter

  // Listen for text input event on the prompt textara
  $('#prompt').on('input', function() {
    var prompt = $(this).val();
  });

  $('#author').on('input', function() {
    var author = $(this).val();
  });

$("#prompt").focus();

textarea.addEventListener("input", () => {
textarea.style.height = "auto";
textarea.style.height = `${textarea.scrollHeight}px`;
});

$("form.openai").submit(function(e) { 
  e.preventDefault();

  $('#past-tense-btn').click(function() {
    tense = "past segment";
    whatTense = "past tense";
  });
  
  $('#present-tense-btn').click(function() {
    tense = "live segment";
    whatTense = "present tense";
  });
  
  $('#future-tense-btn').click(function() {
    tense = "upcoming segment";
    whatTense = "future tense";
  });

  if ($('#summarizeArticle').is(':checked')) {
      var api_key = openai_data1.api_key;
      var model = "text-davinci-003";
      var max_tokens = 500;
      var temperature = .7;
      var url = "https://api.openai.com/v1/completions";
      var prompt = $("#prompt").val();
      var author = $("#author").val();
    
      var data = {
        "model": model,
        "prompt": "Here is an explanation of all the key topics in this article: \n " + prompt + ": \n\n",
        "max_tokens": max_tokens,
        "temperature": temperature
      };
      $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json",
        beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + api_key);
        $('.navis-calling').show();
        $('label').hide();
        $('.prompt-tuning').hide();
        $('.rewrites').hide();
        $('.input-btn').hide();
        $('.texted').hide();
        $('.input-btn').hide();
        $('#gif-container').show();
        $('#prompt').hide();
        $('.openai-input').hide();
        $('.openai-response').css({
          "opacity": "0",
          "display": "none"
          });
        },
    
      success: function(result) {
        var text1 = result.choices[0].text;
        var api_key = openai_data1.api_key;
        var model = "gpt-3.5-turbo";
        var max_tokens = 350;
        var temperature = .7;
        var url = "https://api.openai.com/v1/chat/completions";
        var cacheKey = prompt; // Only use the prompt to construct the cache key
        cacheCounter++; // Increment the counter
        var cachedResponse = localStorage.getItem(cacheKey);
        if (cachedResponse) {
          previousResponseArray = JSON.parse(cachedResponse);
        }
        messages = [
          {"role": "system", "content": "You are a helpful assistant that writes Tweets for The Brian Lehrer Show on WNYC."},
          {"role": "user", "content": "Create an original Tweet for WNYC about this upcoming segment: Anne Williams-Isom, New York City deputy mayor for health and human services, defends Mayor Adams plan to hospitalize people experiencing mental illness in public, and explains in more detail how the administration plans for it to work."},
          {"role": "assistant", "content": "Up first: Deputy Mayor for Health and Human Services AWilliamsIsom discusses Mayor Adams plan to hospitalize New Yorkers experiencing episodes of mental illness in public, and how that plan might be implemented. Listen LIVE on WNYC https://t.co/20NQjvN7re,"},
          {"role": "user", "content": "Create an original Tweet for WNYC about this live segment: Jennifer Kingson, chief correspondent for Axios Whats Next newsletter, talks about the trend of consciously eating to minimize climate impact."},
          {"role": "assistant", "content": "NOW: Were talking about the rise in climatarians, people who are adapting their diet to reduce their environmental impacts with jenniferkingson. How have you changed your diet? Call 212-433-9692 OR tweet BrianLehrer. LIVE WNYC https://t.co/r02tzEM7jm,"},
          {"role": "user", "content": "Create an original Tweet for WNYC about this live segment: Richard Buery, co-chair of the New New York Panel, CEO of Robin Hood and former NYC deputy mayor for strategic policy initiatives, and Daniel Doctoroff, co-chair of the New New York panel; and former CEO, Sidewalk Labs, explain whats in a new joint New York City/State plan to reimagine New York, including ideas to transform business districts and improve transportation and economic mobility."},
          {"role": "assistant", "content": "NOW: RichardBuery and; DanDoctoroff explain the new joint New York City/State plan to reimagine #NewYork, including ideas to transform business districts and improve transportation and economic mobility. Tune in WNYC https://t.co/20NQjvN7re,"},
          {"role": "user", "content": "Create an original Tweet for WNYC about this past segment: James D. Walsh, staff writer at New York Magazine\u2019s Intelligencer, talks about his in-depth reporting on the complexities of the rise in retail thefts."},
          {"role": "assistant", "content": "ICYMI: The increase in retail theft has been widely covered in the last few months. MrJDWalsh explained the complex forces at work behind this story. https://t.co/g6gv8i4RzU,"},
          {"role": "user", "content": "Create an original Tweet for WNYC about this upcoming segment: Michael Grynbaum, a media correspondent for The New York Times, explains controversies in the tech and media worlds surrounding Elon Musks leak of internal Twitter documents to journalist Matt Taibbi. Musk handed over a trove of documents related to Twitters decision to limit posts related to a story about Hunter Biden in 2020. The nature of the leak and Taibbis story have set off debates about Musks leadership and media ethics."},
          {"role": "assistant", "content": "Up first: grynbaum discusses a leak of internal documents from Twitter related to the companys handling of the Hunter Biden laptop story ahead of the 2020 election, though the leak raises questions about proper reporting ethicsListen LIVE on WNYC https://t.co/20NQjvN7re,"},
          {"role": "user", "content": "Create an original Tweet for WNYC about this past segment: Shop Listener is back for a new holiday season. Listeners call in to shout out their businesses ahead of the holidays for a Brian Lehrer Show listener-sourced gift guide."},
          {"role": "assistant", "content": "Stressed about holiday shopping? Dont be. We did our third round of listener call-ins for the 2022 edition of Shop Listener and its full of great gift ideas from listener-owned businesses. https://t.co/3KF6fdzKcg,"},
          {"role": "user", "content": "Create an original Tweet for WNYC about this upcoming segment: Colette Coleman, a writer focused on race and equity, discusses her New York Times article Selling Houses While Black about the challenges faced, and strategies adopted, by Black real estate agents, who are underrepresented in the profession and earn less than their white counterparts."},
          {"role": "assistant", "content": "Up next: Housing and real estate are rife with racial discrimination. But one overlooked aspect is the discrimination real estate agents face. ColetteXColeman is here to discuss the racism faced by Black real estate agents. Listen LIVE WNYC https://t.co/r02tzEM7jm,"},
          {"role": "user", "content": "Create an original Tweet for WNYC about this past segment: On Tuesday, the New York Working Families Party received more than the 130,000 votes necessary to keep their place on the ballot in future elections. Sochie Nnaemeka, director of the New York Working Families Party weighs in on the role of the WFP in Gov. Hochuls election and the future of the party."},
          {"role": "assistant", "content": "This morning, we heard some post-midterms analysis. sochiesays from the NYWFP talked about the Democrats stategy, and the future of progressive policy advocacy in Albany LISTEN: https://t.co/gd5TebV11h,"},
          {"role": "user", "content": "Create an original Tweet for WNYC about this live segment: Elie Honig, senior legal analyst at CNN, author of Untouchable: How Powerful People Get Away with It (Harper, 2023), and former New Jersey and federal prosecutor, talks about the way the criminal justice system works differently for those with wealth and power, as well as weighing in on the prosecution of the police officers charged in the death of Tyre Nichols."},
          {"role": "assistant", "content": "LISTEN: eliehonig speaks with us about his new book, Untouchable: How Powerful People Get Away with It, and how former President Trump has managed to avoid accountability. https://t.co/0Pfl8EOBfI,"},
          {"role": "user", "content": "Create an original Tweet for WNYC about this live segment: The flu, RSV, and COVID are all circulating at high levels, and the CDC and some municipalities (including NYC) are now recommending indoor masking. Jessica Malaty Rivera, infectious disease epidemiologist and research fellow at Boston Childrens Hospital and The Johns Hopkins Center for Health Security, and senior advisor at Pandemic Prevention Initiative, discusses the state of all the respiratory viruses, how they are affecting hospital capacity and more related health news."},
          {"role": "assistant", "content": "LISTEN: jessicamalaty discussed the three-pronged crisis in public health, as severe cases of the #flu, #COVID and #RSV continue to fill up hospital beds in our area and around the country. https://t.co/hrdVl4O83k,"},
          {"role": "user", "content": "Create an original Tweet for WNYC about this past segment: While callers share who they voted for if they only just decided in the past couple weeks, and other related thoughts, Brigid Bergin, WNYCs senior political correspondent and host of The Peoples Guide to Power, talks about her reporting on elections, democracy and whats at stake as New Yorkers vote for governor and other offices."},
          {"role": "assistant", "content": "Happy Election Day! This A.M., brigidbergin joined to discuss her reporting on elections, democracy, and the NYS gubernatorial race as listeners called in for our informal, unofficial, unscientific exit poll. LISTEN: https://t.co/QDrPy2Osxm,"},
          {"role": "user", "content": "Create an original Tweet for WNYC about this past segment: The majority of the New York City Council members are new and are part of a class that is the most diverse and progressive in city history. This year Brian Lehrer will get to know all 51 members. Today, Councilmember Mercedes Narcisse talks about her priorities for District 46, which includes Canarsie, Bergen Beach, Mill Basin, Gerritsen Beach, Georgetown, and parts of Marine Park, Flatlands, and Sheepshead Bay."},
          {"role": "assistant", "content": "For this weeks installment of 51 Council Members In 52 Weeks, Brooklyns Mercedes Narcisse talked about her district, which includes Canarsie, Bergen Beach, Mill Basin, Gerritsen Beach, Georgetown, Flatlands, and Sheepshead BayLISTEN:https://t.co/JnuMwiZYdp,"},
          {"role": "user", "content": "Create an original Tweet for WNYC about this live segment: Libby Nelson, deputy policy editor at Vox, joins to break down some of the initiatives and referendums on ballots across the country on election day."},
          {"role": "assistant", "content": "NOW: libbyanelson, policy editor voxdotcom, joins to break down some of the initiatives and referendums on ballots across the country on election day. https://t.co/2k2UlaQleE,"},
          {"role": "user", "content": "Create an original Tweet for WNYC about this past segment: Sharon Kleinbaum, senior rabbi and spiritual leader of Congregation Beit Simchat Torah in New York City, Jay Caspian Kang, staff writer for The New Yorker, documentary film director, and the author of The Loneliest Americans (Crown, 2021), Eddie Glaude, Jr., chair of Princetons African-American studies department and the author of Begin Again: James Baldwins America and Its Urgent Lessons for Our Own (Crown, 2020), on the verbal and physical expressions of hate in 2022, and how to combat it."},
          {"role": "assistant", "content": "This AM, Skleinbaum, jaycaspiankang, and; esglaude reflected on the noticeable rise of hate over the past year. In the process, they uncovered the underlying societal causes of the uptick.LISTEN: https://t.co/SKobrDOvMk,"},
          {"role": "user", "content": "Create an original Tweet for WNYC about this live segment: Katie Thornton, host of The Divided Dial, independent journalist, public historian, and Fulbright Fellow, discusses her new series with On the Media in which she dives deep into the far-rights dominance of talk radio."},
          {"role": "assistant", "content": "How did the right-wing ideology come to dominate talk radio? Investigative journalist Katie Thorton explores this question in the new series The Divided Dial from OntheMedia.https://t.co/K5iE8YTfbC,"},
          {"role": "user", "content": "Create an original Tweet for WNYC about this upcoming segment: The majority of the New York City Council members are new and are part of a class that is the most diverse and progressive in city history. This year Brian Lehrer will get to know all 51 members. Today, Councilmember Joseph C. Borelli, talks about his priorities for district 51, which includes many neighborhoods in the southern swath of Staten Island."},
          {"role": "assistant", "content": "Up next: 51 Council Members In 52 Weeks, with Staten Islands JoeBorelliNYC. Hear what issues the council members constituents are most impacted by, what policies hes been pursuing in the Council, and what makes him proud of his district. Listen LIVE on WNYC,"},
          {"role": "user", "content": "Create an original Tweet for WNYC about this past segment: With news that the powerful synthetic opioid fentanyl is responsible for a continued rise in overdose deaths in New York City and elsewhere, Sam Quinones, independent journalist and the author of Dreamland: The True Tale of Americas Opiate Epidemic and (now in paperback), The Least of Us: True Tales of America and Hope in the Time of Fentanyl and Meth (Bloomsbury, 2021), and Courtney McKnight, clinical assistant professor of epidemiology at NYUs School of Global Public Health, talk about the drug and what makes it so life-threatening and resistant to efforts to stem its abuse."},
          {"role": "assistant", "content": "The opioid crisis is far from over. Now, fentanyl is driving the rise in overdose deaths. We spoke to journalist samquinones7 and; NYU prof Courtney McKnight about what makes fentanyl so dangerous and the challenges in ending this crisis. https://t.co/SByCOh4kyT,"},
          {"role": "user", "content": "Create an original Tweet for WNYC about this past segment: Jonathan Lemire, host of \u201cWay Too Early on MSNBC, Politico White House bureau chief, and the author of The Big Lie: Election Chaos, Political Opportunism, and the State of American Politics After 2020 (Flatiron Books, 2022), shares the latest news on the classified documents found in President Bidens files from his time as vice president -- and the similarities and differences with the files held by former President Trump and the appointment of a special counsel to investigate."},
          {"role": "assistant", "content": "The news that classified documents were found at Bidens residence has a lot of people asking how this situation is different from the Trump document situation. JonLemire discussed all the investigations into Biden on the show today.Catch up here: https://t.co/CsEwUAujEq,"},
          {"role": "user", "content": "Create an original Tweet for WNYC about this live segment: On the second anniversary, Andrea Bernstein, investigative journalist covering democracy for ProPublica, Will Be Wild podcast co-host and the author of American Oligarchs: The Kushners, the Trumps, and the Marriage of Money and Power (W.W. Norton and Co, 2020), reflects on the January 6th attack on the U.S. Capitol, and what has happened in the intervening years. Manisha Sinha, professor of American history at the University of Connecticut and the author of many books including the forthcoming The Rise and Fall of the Second American Republic: A Long History of Reconstruction, 1860-1900, provides historical context to make sense of the anniversary of this horrific event."},
          {"role": "assistant", "content": "Live NOW: On the second anniversary of the Jan. 6, 2021 attack on the democratic process, AndreaBNYC and ProfMSinha reflect on how weve responded to the event in the years since. Listen LIVE on WNYC https://t.co/20NQjvN7re,"},
          {"role": "user", "content": "Create an original Tweet for WNYC about this past segment: U.S. Representative Mike Lawler (R, NY-17) and U.S. Representative Josh Gottheimer (D, NJ-5), explain why they are against the congestion pricing plan, which would charge drivers heading into Manhattan below 60th Street."},
          {"role": "assistant", "content": "With congestion pricing looming in NYC, suburban Congress members lawler4ny and; RepJoshG are joining forces from across the isle in opposition to extra costs on their constituents. Hear their arguments from this mornings show: https://t.co/gPZ4WbgNou,"},
          {"role": "user", "content": "Create an original Tweet for WNYC about this past segment: Last week, the mayors office announced an increase of $14.5 million in funding for citywide cleaning operations. The Get Stuff Clean initiative includes funding to clean up No Mans Land areas, increase litter basket maintenance, and bolster rat mitigation. Meera Joshi, deputy mayor for operations, joins to talk about the plans for cleaning up the city."},
          {"role": "assistant", "content": "NYC deputy mayor for operations Meera Joshi spoke with us about the Get Stuff Clean initiative, which includes funding to clean up long-neglected areas, increase litter basket maintenance and bolster rat mitigation. https://t.co/Nhj5iRTCZF,"},
          {"role": "user", "content": "Create a numbered list of five different Tweets for WNYC without hashtags and including the guest's Twitter handle " + author + " about this " + tense + ": " + text1}
        ]
        var data4 = {
          "model": model,
          "messages": messages,
          "max_tokens": max_tokens,
          "temperature": temperature
        };
        $.ajax({
          type: "POST",
          url: url,
          data: JSON.stringify(data4),
          contentType: "application/json",
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + api_key);
            $('.navis-calling').show();
            $('label').hide();
            $('.prompt-tuning').hide();
            $('.rewrites').hide();
            $('.input-btn').hide();
            $('.texted').hide();
            $('.input-btn').hide();
            $('#gif-container').show();
            $('#prompt').hide();
            $('.openai-input').hide();
            $('.openai-response').css({
              "opacity": "0",
              "display": "none"
            });
          },
          success: function(result) {
          previousResponseArray.push(result.choices[0].message.content);
          localStorage.setItem(cacheKey, JSON.stringify(previousResponseArray));
          var text = result.choices[0].message.content;
          // Split the response into separate tweets by looking for instances of "\n\n"
          var tweets = text.split("\n");
    
          // Create a div element for each tweet
          var tweetDivs = tweets.map(function(tweet) {
            if (tweet.trim() === '') {
              // If the tweet is empty, return an empty string
              return '';
              }
              // Otherwise, create a div for the tweet
              return "<div class='tweet'>" + tweet + "</div>";
              });
              // Join the tweet divs together and insert them into the DOM
              var formattedText = tweetDivs.join("");
              $(".openai-response").html(formattedText);
    
          // Hide any empty tweet elements
          $(".tweet:empty").css("display", "none");
          $('.navis-calling').hide();
          $('label').show();
          $('.rewrites').show();
          $('#prompt').show();
          $('.prompt-tuning').show();
          $('.texted').show();
          $('.input-btn').show();
          $('.openai-input').show();
          $('.input-btn').show();
          $('#gif-container').hide();
          $('.openai-response').css({
            "opacity": "1",
            "display": "flex"
        });
            },
            error: function(jqXHR, textStatus, errorThrown) {
            $('.navis-calling').hide();
            $('label').show();
            $('#prompt').show();
            $('#gif-container').hide();
            $('.rewrites').hide();
            $('.prompt-tuning').show();
            $('.input-btn').show();
            $('.openai-input').show();
            $('.texted').show();
            $('.input-btn').show();
            $('.openai-response').html("<p>Error: " + jqXHR.responseJSON.error.message + "</p>");
            $('.openai-response').css({
            "opacity": "1",
            "display": "flex"
            });
            }
            }),
            // Hide any empty tweet elements
            $(".tweet:empty").css("display", "none");
            $('.navis-calling').show();
                  $('label').hide();
                  $('.rewrites').hide();
                  $('#prompt').hide();
                  $('.prompt-tuning').hide();
                  $('.texted').hide();
                  $('.input-btn').hide();
                  $('.openai-input').hide();
                  $('.input-btn').hide();
                  $('#gif-container').show();
                  $('.openai-response').css({
                    "opacity": "0",
                    "display": "none"
                  });
                },
              })
      }
    else {
      var prompt = $("#prompt").val();
      var api_key = openai_data1.api_key;
      var model = "gpt-3.5-turbo";
      var max_tokens = 350;
      var temperature = .7;
      var url = "https://api.openai.com/v1/chat/completions";
      var cacheKey = prompt; // Only use the prompt to construct the cache key
      var author = $("#author").val();
      messages = [
        {"role": "system", "content": "You are a helpful assistant that writes Tweets for The Brian Lehrer Show on WNYC."},
        {"role": "user", "content": "Create an original Tweet for WNYC about this upcoming segment: Anne Williams-Isom, New York City deputy mayor for health and human services, defends Mayor Adams plan to hospitalize people experiencing mental illness in public, and explains in more detail how the administration plans for it to work."},
        {"role": "assistant", "content": "Up first: Deputy Mayor for Health and Human Services AWilliamsIsom discusses Mayor Adams plan to hospitalize New Yorkers experiencing episodes of mental illness in public, and how that plan might be implemented. Listen LIVE on WNYC https://t.co/20NQjvN7re,"},
        {"role": "user", "content": "Create an original Tweet for WNYC about this live segment: Jennifer Kingson, chief correspondent for Axios Whats Next newsletter, talks about the trend of consciously eating to minimize climate impact."},
        {"role": "assistant", "content": "NOW: Were talking about the rise in climatarians, people who are adapting their diet to reduce their environmental impacts with jenniferkingson. How have you changed your diet? Call 212-433-9692 OR tweet BrianLehrer. LIVE WNYC https://t.co/r02tzEM7jm,"},
        {"role": "user", "content": "Create an original Tweet for WNYC about this live segment: Richard Buery, co-chair of the New New York Panel, CEO of Robin Hood and former NYC deputy mayor for strategic policy initiatives, and Daniel Doctoroff, co-chair of the New New York panel; and former CEO, Sidewalk Labs, explain whats in a new joint New York City/State plan to reimagine New York, including ideas to transform business districts and improve transportation and economic mobility."},
        {"role": "assistant", "content": "NOW: RichardBuery and; DanDoctoroff explain the new joint New York City/State plan to reimagine #NewYork, including ideas to transform business districts and improve transportation and economic mobility. Tune in WNYC https://t.co/20NQjvN7re,"},
        {"role": "user", "content": "Create an original Tweet for WNYC about this past segment: James D. Walsh, staff writer at New York Magazine\u2019s Intelligencer, talks about his in-depth reporting on the complexities of the rise in retail thefts."},
        {"role": "assistant", "content": "ICYMI: The increase in retail theft has been widely covered in the last few months. MrJDWalsh explained the complex forces at work behind this story. https://t.co/g6gv8i4RzU,"},
        {"role": "user", "content": "Create an original Tweet for WNYC about this upcoming segment: Michael Grynbaum, a media correspondent for The New York Times, explains controversies in the tech and media worlds surrounding Elon Musks leak of internal Twitter documents to journalist Matt Taibbi. Musk handed over a trove of documents related to Twitters decision to limit posts related to a story about Hunter Biden in 2020. The nature of the leak and Taibbis story have set off debates about Musks leadership and media ethics."},
        {"role": "assistant", "content": "Up first: grynbaum discusses a leak of internal documents from Twitter related to the companys handling of the Hunter Biden laptop story ahead of the 2020 election, though the leak raises questions about proper reporting ethicsListen LIVE on WNYC https://t.co/20NQjvN7re,"},
        {"role": "user", "content": "Create an original Tweet for WNYC about this past segment: Shop Listener is back for a new holiday season. Listeners call in to shout out their businesses ahead of the holidays for a Brian Lehrer Show listener-sourced gift guide."},
        {"role": "assistant", "content": "Stressed about holiday shopping? Dont be. We did our third round of listener call-ins for the 2022 edition of Shop Listener and its full of great gift ideas from listener-owned businesses. https://t.co/3KF6fdzKcg,"},
        {"role": "user", "content": "Create an original Tweet for WNYC about this upcoming segment: Colette Coleman, a writer focused on race and equity, discusses her New York Times article Selling Houses While Black about the challenges faced, and strategies adopted, by Black real estate agents, who are underrepresented in the profession and earn less than their white counterparts."},
        {"role": "assistant", "content": "Up next: Housing and real estate are rife with racial discrimination. But one overlooked aspect is the discrimination real estate agents face. ColetteXColeman is here to discuss the racism faced by Black real estate agents. Listen LIVE WNYC https://t.co/r02tzEM7jm,"},
        {"role": "user", "content": "Create an original Tweet for WNYC about this past segment: On Tuesday, the New York Working Families Party received more than the 130,000 votes necessary to keep their place on the ballot in future elections. Sochie Nnaemeka, director of the New York Working Families Party weighs in on the role of the WFP in Gov. Hochuls election and the future of the party."},
        {"role": "assistant", "content": "This morning, we heard some post-midterms analysis. sochiesays from the NYWFP talked about the Democrats stategy, and the future of progressive policy advocacy in Albany LISTEN: https://t.co/gd5TebV11h,"},
        {"role": "user", "content": "Create an original Tweet for WNYC about this live segment: Elie Honig, senior legal analyst at CNN, author of Untouchable: How Powerful People Get Away with It (Harper, 2023), and former New Jersey and federal prosecutor, talks about the way the criminal justice system works differently for those with wealth and power, as well as weighing in on the prosecution of the police officers charged in the death of Tyre Nichols."},
        {"role": "assistant", "content": "LISTEN: eliehonig speaks with us about his new book, Untouchable: How Powerful People Get Away with It, and how former President Trump has managed to avoid accountability. https://t.co/0Pfl8EOBfI,"},
        {"role": "user", "content": "Create an original Tweet for WNYC about this live segment: The flu, RSV, and COVID are all circulating at high levels, and the CDC and some municipalities (including NYC) are now recommending indoor masking. Jessica Malaty Rivera, infectious disease epidemiologist and research fellow at Boston Childrens Hospital and The Johns Hopkins Center for Health Security, and senior advisor at Pandemic Prevention Initiative, discusses the state of all the respiratory viruses, how they are affecting hospital capacity and more related health news."},
        {"role": "assistant", "content": "LISTEN: jessicamalaty discussed the three-pronged crisis in public health, as severe cases of the #flu, #COVID and #RSV continue to fill up hospital beds in our area and around the country. https://t.co/hrdVl4O83k,"},
        {"role": "user", "content": "Create an original Tweet for WNYC about this past segment: While callers share who they voted for if they only just decided in the past couple weeks, and other related thoughts, Brigid Bergin, WNYCs senior political correspondent and host of The Peoples Guide to Power, talks about her reporting on elections, democracy and whats at stake as New Yorkers vote for governor and other offices."},
        {"role": "assistant", "content": "Happy Election Day! This A.M., brigidbergin joined to discuss her reporting on elections, democracy, and the NYS gubernatorial race as listeners called in for our informal, unofficial, unscientific exit poll. LISTEN: https://t.co/QDrPy2Osxm,"},
        {"role": "user", "content": "Create an original Tweet for WNYC about this past segment: The majority of the New York City Council members are new and are part of a class that is the most diverse and progressive in city history. This year Brian Lehrer will get to know all 51 members. Today, Councilmember Mercedes Narcisse talks about her priorities for District 46, which includes Canarsie, Bergen Beach, Mill Basin, Gerritsen Beach, Georgetown, and parts of Marine Park, Flatlands, and Sheepshead Bay."},
        {"role": "assistant", "content": "For this weeks installment of 51 Council Members In 52 Weeks, Brooklyns Mercedes Narcisse talked about her district, which includes Canarsie, Bergen Beach, Mill Basin, Gerritsen Beach, Georgetown, Flatlands, and Sheepshead BayLISTEN:https://t.co/JnuMwiZYdp,"},
        {"role": "user", "content": "Create an original Tweet for WNYC about this live segment: Libby Nelson, deputy policy editor at Vox, joins to break down some of the initiatives and referendums on ballots across the country on election day."},
        {"role": "assistant", "content": "NOW: libbyanelson, policy editor voxdotcom, joins to break down some of the initiatives and referendums on ballots across the country on election day. https://t.co/2k2UlaQleE,"},
        {"role": "user", "content": "Create an original Tweet for WNYC about this past segment: Sharon Kleinbaum, senior rabbi and spiritual leader of Congregation Beit Simchat Torah in New York City, Jay Caspian Kang, staff writer for The New Yorker, documentary film director, and the author of The Loneliest Americans (Crown, 2021), Eddie Glaude, Jr., chair of Princetons African-American studies department and the author of Begin Again: James Baldwins America and Its Urgent Lessons for Our Own (Crown, 2020), on the verbal and physical expressions of hate in 2022, and how to combat it."},
        {"role": "assistant", "content": "This AM, Skleinbaum, jaycaspiankang, and; esglaude reflected on the noticeable rise of hate over the past year. In the process, they uncovered the underlying societal causes of the uptick.LISTEN: https://t.co/SKobrDOvMk,"},
        {"role": "user", "content": "Create an original Tweet for WNYC about this live segment: Katie Thornton, host of The Divided Dial, independent journalist, public historian, and Fulbright Fellow, discusses her new series with On the Media in which she dives deep into the far-rights dominance of talk radio."},
        {"role": "assistant", "content": "How did the right-wing ideology come to dominate talk radio? Investigative journalist Katie Thorton explores this question in the new series The Divided Dial from OntheMedia.https://t.co/K5iE8YTfbC,"},
        {"role": "user", "content": "Create an original Tweet for WNYC about this upcoming segment: The majority of the New York City Council members are new and are part of a class that is the most diverse and progressive in city history. This year Brian Lehrer will get to know all 51 members. Today, Councilmember Joseph C. Borelli, talks about his priorities for district 51, which includes many neighborhoods in the southern swath of Staten Island."},
        {"role": "assistant", "content": "Up next: 51 Council Members In 52 Weeks, with Staten Islands JoeBorelliNYC. Hear what issues the council members constituents are most impacted by, what policies hes been pursuing in the Council, and what makes him proud of his district. Listen LIVE on WNYC,"},
        {"role": "user", "content": "Create an original Tweet for WNYC about this past segment: With news that the powerful synthetic opioid fentanyl is responsible for a continued rise in overdose deaths in New York City and elsewhere, Sam Quinones, independent journalist and the author of Dreamland: The True Tale of Americas Opiate Epidemic and (now in paperback), The Least of Us: True Tales of America and Hope in the Time of Fentanyl and Meth (Bloomsbury, 2021), and Courtney McKnight, clinical assistant professor of epidemiology at NYUs School of Global Public Health, talk about the drug and what makes it so life-threatening and resistant to efforts to stem its abuse."},
        {"role": "assistant", "content": "The opioid crisis is far from over. Now, fentanyl is driving the rise in overdose deaths. We spoke to journalist samquinones7 and; NYU prof Courtney McKnight about what makes fentanyl so dangerous and the challenges in ending this crisis. https://t.co/SByCOh4kyT,"},
        {"role": "user", "content": "Create an original Tweet for WNYC about this past segment: Jonathan Lemire, host of \u201cWay Too Early on MSNBC, Politico White House bureau chief, and the author of The Big Lie: Election Chaos, Political Opportunism, and the State of American Politics After 2020 (Flatiron Books, 2022), shares the latest news on the classified documents found in President Bidens files from his time as vice president -- and the similarities and differences with the files held by former President Trump and the appointment of a special counsel to investigate."},
        {"role": "assistant", "content": "The news that classified documents were found at Bidens residence has a lot of people asking how this situation is different from the Trump document situation. JonLemire discussed all the investigations into Biden on the show today.Catch up here: https://t.co/CsEwUAujEq,"},
        {"role": "user", "content": "Create an original Tweet for WNYC about this live segment: On the second anniversary, Andrea Bernstein, investigative journalist covering democracy for ProPublica, Will Be Wild podcast co-host and the author of American Oligarchs: The Kushners, the Trumps, and the Marriage of Money and Power (W.W. Norton and Co, 2020), reflects on the January 6th attack on the U.S. Capitol, and what has happened in the intervening years. Manisha Sinha, professor of American history at the University of Connecticut and the author of many books including the forthcoming The Rise and Fall of the Second American Republic: A Long History of Reconstruction, 1860-1900, provides historical context to make sense of the anniversary of this horrific event."},
        {"role": "assistant", "content": "Live NOW: On the second anniversary of the Jan. 6, 2021 attack on the democratic process, AndreaBNYC and ProfMSinha reflect on how weve responded to the event in the years since. Listen LIVE on WNYC https://t.co/20NQjvN7re,"},
        {"role": "user", "content": "Create an original Tweet for WNYC about this past segment: U.S. Representative Mike Lawler (R, NY-17) and U.S. Representative Josh Gottheimer (D, NJ-5), explain why they are against the congestion pricing plan, which would charge drivers heading into Manhattan below 60th Street."},
        {"role": "assistant", "content": "With congestion pricing looming in NYC, suburban Congress members lawler4ny and; RepJoshG are joining forces from across the isle in opposition to extra costs on their constituents. Hear their arguments from this mornings show: https://t.co/gPZ4WbgNou,"},
        {"role": "user", "content": "Create an original Tweet for WNYC about this past segment: Last week, the mayors office announced an increase of $14.5 million in funding for citywide cleaning operations. The Get Stuff Clean initiative includes funding to clean up No Mans Land areas, increase litter basket maintenance, and bolster rat mitigation. Meera Joshi, deputy mayor for operations, joins to talk about the plans for cleaning up the city."},
        {"role": "assistant", "content": "NYC deputy mayor for operations Meera Joshi spoke with us about the Get Stuff Clean initiative, which includes funding to clean up long-neglected areas, increase litter basket maintenance and bolster rat mitigation. https://t.co/Nhj5iRTCZF,"},
        {"role": "user", "content": "Create a numbered list of five different Tweets for WNYC without hashtags and including the guest's Twitter handle " + author + " about this " + tense + ": " + prompt}
        ];
      cacheCounter++; // Increment the counter
      var cachedResponse = localStorage.getItem(cacheKey);
      if (cachedResponse) {
        previousResponseArray = JSON.parse(cachedResponse);
        }
      var data = {
        "model": model,
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": temperature
      };
      $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json",
        beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + api_key);
        $('.navis-calling').show();
        $('label').hide();
        $('.prompt-tuning').hide();
        $('.rewrites').hide();
        $('.input-btn').hide();
        $('.texted').hide();
        $('.input-btn').hide();
        $('#gif-container').show();
        $('#prompt').hide();
        $('.openai-input').hide();
        $('.openai-response').css({
            "opacity": "0",
            "display": "none"
          });
        },
        success: function(result) {
          previousResponseArray.push(result.choices[0].message.content);
          localStorage.setItem(cacheKey, JSON.stringify(previousResponseArray));
          var text = result.choices[0].message.content;
          // Split the response into separate tweets by looking for instances of "\n\n"
          var tweets = text.split("\n");
          // Create a div element for each tweet
          var tweetDivs = tweets.map(function(tweet) {
            if (tweet.trim() === '') {
              // If the tweet is empty, return an empty string
              return '';
            }
            // Otherwise, create a div for the tweet
            return "<div class='tweet'>" + tweet + "</div>";
          });
          // Join the tweet divs together and insert them into the DOM
          var formattedText = tweetDivs.join("");
          $(".openai-response").html(formattedText);
          
          // Hide any empty tweet elements
          $(".tweet:empty").css("display", "none");
          $('.navis-calling').hide();
          $('label').show();
          $('#prompt').show();
          $('.prompt-tuning').show();
          $('.rewrites').show();
          $('.input-btn').show();
          $('.openai-input').show();
          $('.texted').show();
          $('.input-btn').show();
          $('#gif-container').hide();
          $('.openai-response').css({
              "opacity": "1",
              "display": "flex"
          });
        },
        error: function(jqXHR, textStatus, errorThrown) {
        $('.navis-calling').hide();
        $('label').show();
        $('#prompt').show();
        $('#gif-container').hide();
        $('.rewrites').hide();
        $('.prompt-tuning').show();
        $('.input-btn').show();
        $('.openai-input').show();
        $('.texted').show();
        $('.input-btn').show();
        $('.openai-response').html("<p>Error: " + jqXHR.responseJSON.error.message + "</p>");
        $('.openai-response').css({
            "opacity": "1",
            "display": "flex"
          });
        }
        });
    }
  });

$('#creative-btn').click(function() {
  var inputVariable = " more creative:";
  runRewrite(inputVariable);
});

$('#serious-btn').click(function() {
  var inputVariable = " more serious:";
  runRewrite(inputVariable);
});

$('#longer-btn').click(function() {
  var prompt3 = $("#prompt").val();
  var inputVariable = " more descriptive, more detailed, and with a maximum of 280 characters, using this reference: \n" + prompt3 + ": \n";
  runRewrite(inputVariable);
});

function runRewrite(inputVariable) {
    var cacheKey = $('#prompt').val() + '-' + (cacheCounter - 1); // Get the cache key from the previous request
    var api_key = openai_data1.api_key;
    var max_tokens = 800;
    var model = "text-davinci-003";
    var temperature = .6;
    var url = "https://api.openai.com/v1/completions";
    var prompt2 = previousResponseArray[previousResponseArray.length - 1]; // Get the last response from the array
    var prompt3 = $("#prompt").val();


    var data2 = {
      "model": model,
      "prompt": "Make the five tweets in this numbered list " + inputVariable + " \n" + prompt2 + ": \n",
      "max_tokens": max_tokens,
      "temperature": temperature
    };

    $.ajax({
      type: "POST",
      url: url,
      data: JSON.stringify(data2),
      contentType: "application/json",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + api_key);
        $('.navis-calling').show();
        $('label').hide();
        $('.rewrites').hide();
        $('.prompt-tuning').hide();       
        $('.input-btn').hide();
        $('.texted').hide();
        $('.input-btn').hide();
        $('#gif-container').show();
        $('#prompt').hide();
        $('.openai-input').hide();
        $('.openai-response').css({
          "opacity": "0",
          "display": "none"
        });
      },
      success: function(result) {
        previousResponseArray.push(result.choices[0].text);
        localStorage.setItem(cacheKey, JSON.stringify(previousResponseArray));
        var text = result.choices[0].text;

       // Split the response into separate tweets by looking for instances of "\n\n"
        var tweets = text.split("\n");

       // Create a div element for each tweet
      var tweetDivs = tweets.map(function(tweet) {
      if (tweet.trim() === '') {
      // If the tweet is empty, return an empty string
      return '';
    }
    // Otherwise, create a div for the tweet
    return "<div class='tweet'>" + tweet + "</div>";
   });

  // Join the tweet divs together and insert them into the DOM
  var formattedText = tweetDivs.join("");
  $(".openai-response").html(formattedText);
  
  // Hide any empty tweet elements
  $(".tweet:empty").css("display", "none");
  $('.navis-calling').hide();
        $('label').show();
        $('.rewrites').show();
        $('#prompt').show();
        $('.prompt-tuning').show();
        $('.texted').show();
        $('.input-btn').show();
        $('.openai-input').show();
        $('.input-btn').show();
        $('#gif-container').hide();
        $('.openai-response').css({
          "opacity": "1",
          "display": "flex"
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        $('.navis-calling').hide();
        $('label').show();
        $('#prompt').show();
        $('.texted').show();
        $('.input-btn').show();
        $('#gif-container').hide();
        $('.rewrites').hide();
        $('.prompt-tuning').show();
        $('.input-btn').show();
        $('.openai-input').show();
        $('.openai-response').html("<p>Error: " + jqXHR.responseJSON.error.message + "</p>");
        $('.openai-response').css({
          "opacity": "1",
          "display": "flex"
        });
      }
    });
  };
    });