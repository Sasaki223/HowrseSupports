     // <td colspan="1"><div style="font-size:10px;display:none"><input type="checkbox" id="SwitchHorseWhenDone"><label for="SwitchHorseWhenDone" checked> Zmienic konia?</label></div>

     var HowrseSupporterMain = {
        addUtilities: function(){
            if($('#personnalisation')){
                $('#care-head-title').parent().prepend(`
                    <table class="table-customo">
                        <thead>
                            <tr>
                                <th colspan="3"></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td colspan="2"><div id="takeConfig" style="cursor: pointer;color:#2980b9;border:1px solid rgb(255, 255, 255);border-radius:10px 10px 10px 10px;padding:9px;background:linear-gradient(to top,rgb(86, 196, 244),rgb(146, 246, 247));font-size:12px;">Ustawienia</div></td>
                                <td colspan="1"><div id="takeRefresh" style="cursor: pointer;color:#2980b9;border:1px solid rgb(255, 255, 255);border-radius:10px 10px 10px 10px;padding:9px;background:linear-gradient(to top,rgb(86, 196, 244),rgb(146, 246, 247));font-size:12px;">Odśwież czerwone</div></td>
                            </tr>

                            <tr>
                                <td colspan="1"><div id="TakeCare" style="cursor: pointer;color:#2980b9;border:1px solid rgb(255, 255, 255);border-radius:10px 10px 10px 10px;padding:9px;background:linear-gradient(to top,rgb(86, 196, 244),rgb(146, 246, 247));font-size:12px;">Opieka</div></td>
                                <td colspan="1"><div id="TakeTraining" style="cursor: pointer;color:#2980b9;border:1px solid rgb(255, 255, 255);border-radius:10px 10px 10px 10px;padding:9px;background:linear-gradient(to top,rgb(86, 196, 244),rgb(146, 246, 247));font-size:12px;">Trening</div></td>
                                <td colspan="1"><div id="TakeTrainingAll" style="cursor: pointer;color:#2980b9;border:1px solid rgb(255, 255, 255);border-radius:10px 10px 10px 10px;padding:9px;background:linear-gradient(to top,rgb(86, 196, 244),rgb(146, 246, 247));font-size:12px;">Wszystko</div></td>
                            </tr>
                        </tbody>
                    </table>
                `)

                // $('#care-head-title').parent().prepend('<div id="TakeTraining" style="display:inline-block;cursor: pointer;color:#2980b9;border:1px solid rgb(255, 255, 255);border-radius:9px;padding:11px;background:linear-gradient(to top,rgb(86, 196, 244),rgb(146, 246, 247))">Auto-trening</div>');
                // $('#care-head-title').parent().prepend('<div id="TakeCare" style="display:inline-block;cursor: pointer;color:#2980b9;border:1px solid rgb(255, 255, 255);margin:5px;margin-right:65px;border-radius:9px;padding:11px;background:linear-gradient(to top,rgb(86, 196, 244),rgb(146, 246, 247))">Auto-opieka</div>')
                // $('#care-head-title').parent().prepend('<div id="takeRefresh" style="display:inline-block;cursor: pointer;color:#2980b9;border:1px solid rgb(255, 255, 255);margin:5px;margin-right:65px;border-radius:9px;padding:11px;background:linear-gradient(to top,rgb(86, 196, 244),rgb(146, 246, 247))">Odśwież czerwone</div>')



                $("#TakeCare").click(function(){
                    HowrseSupporterMain.TakeCare(false);
                });

                $("#TakeTraining").click(function(){
                    HowrseSupporterMain.TakeTraining(false, false);
                });

                $("#TakeTrainingAll").click(function(){
                    HowrseSupporterMain.TakeTraining(true, false);
                });

                $('#takeRefresh').click(function(){
                    HowrseSupporterUtils.RefreshRedEnergy();
                });

                $('#takeConfig').click(function(){
                    HowrseSupporterUtils.OpenConfigMenu();
                });




                $('#walk-wrapper button').click(function(){
                    setTimeout(function(){
                        HowrseSupporterUtils.JustFeed(0);
                        setTimeout(function(){
                            HowrseSupporterUtils.RefreshRedEnergy();
                        }, 1000)
                    }, 500)
                });

                $("#formCenterPlaySubmit").click(function(){
                    setTimeout(function(){
                        $("#TakeCare").click();
                    }, 500);
                });

            };
        },


        TakeCare: function(ShouldTakeTraining){
            var forms = [
                "#form-do-suckle",
                "#form-do-drink",
                "#form-do-stroke",
                "#form-do-groom",
                "#form-do-night"
            ]

            execWhenReady(function(){
                HowrseSupporterUtils.JustFeed(1);

                setTimeout(function(){
                    for(let i=0;i<forms.length;i++){
                        setTimeout(function(){
                            $(forms[i]).submit();
                            setTimeout(function(){
                                if(HowrseSupporterUtils.CheckIfActuallySubmitted(forms[i])){
                                    if (i==forms.length-1){
                                        HowrseSupporterMain.GiveSupplies(ShouldTakeTraining);
                                    }
                                };
                            }, i * 400);
                        }, i * 400);
                    };

                }, 800)
            })
        },

        GiveSupplies: function(ShouldTakeTraining){
            let marchewki = 0;
            let mieszanki = 0;

            $('#center-tab-main img').each(function(){
                if ($(this).attr('src') == "/media/equideo/image/produits/20/mash.png") {
                    mieszanki++
                } else if ($(this).attr('src') == '/media/equideo/image/produits/20/carotte.png') {
                    marchewki++
                };
            });


            if(marchewki == 1){
                $('#form-do-eat-treat-carotte').submit();
            }
            setTimeout(function(){
                if (mieszanki == 1){
                    $('#form-do-eat-treat-mash').submit();
                }
                setTimeout(function(){
                    if (ShouldTakeTraining){
                        HowrseSupporterMain.TakeTraining(false, true);
                    } else {
                        HowrseSupporterUtils.RefreshRedEnergy();
                    }
                }, 400)
            }, 400)

        },

        TakeTraining: function(ShouldTakeCare, ShouldSwitchHorse){
            var t;
            var lastElem;
            var timerOn = !0;
            var a = "Twoja klacz zdobędzie więcej umiejętności w tym treningu!";
            var b = "Twój koń zdobędzie więcej umiejętności w tym treningu!";
            var c = "Trening ukończony!";
            var found = !1;
            var elemen;
            $(".training-table-summary tr td").each(function(e, elem) {
                if ($(this).attr("_tooltip") && $(this).attr("_tooltip") == a || $(this).attr("_tooltip") == b) {
                    found = !0;
                    elemen = this;
                    return !1
                }
            });
            if (found != !0) {
                $(".training-table-summary tr td").each(function(e, elem) {
                    if ($(this).attr("_tooltip") && $(this).attr("_tooltip") != c) {
                        found = !0;
                        elemen = this;
                        return !1
                    }
                })
            };
            if (found == !0) {
                let parent = $(elemen).parent();
                let fnd = $(parent).find('.last');
                let btn = $(fnd).find('button');
                $(btn).click();
                ($('#training-wrapper').children()).each(function(index) {
                    if ($(this).css("display") == "block") {
                        let button = $(this).find("button");
                        let olist = $(this).find("ol");
                        let ulist = $(this).find("ul");
                        let elems = $(olist).find("li");
                        $(elems).eq(1).click();
                        setTimeout(function(){
                            let eeenergia = $(ulist[1]).find("span");
                            let kkonEnergia = parseInt($('#energie').text());
                            eeenergia = parseFloat($(eeenergia[0]).text().substring(1));
                            let reEnergy = eeenergia;
                            var lastelement = 0;

                            for(let i=1;i<20;i++){
                                if (kkonEnergia - reEnergy <= 20){
                                    break;
                                }
                                lastelement = i;
                                reEnergy = reEnergy + eeenergia;
                            }

                            // && $("#SwitchHorseWhenDone").prop("checked") == true
                            $(elems).each(function(index){
                                if ($(this).attr("data-number") == lastelement){
                                    $(this).click();
                                    setTimeout(function(){
                                        $(button).click();
                                        setTimeout(function(){
                                            if (ShouldTakeCare){
                                                HowrseSupporterMain.TakeCare(true);
                                            } else if (ShouldSwitchHorse){
                                                HowrseSupporterUtils.JustFeed(0);
                                                setTimeout(function(){
                                                    document.getElementById('nav-next').click();
                                                }, 700)
                                            } else {
                                                HowrseSupporterUtils.JustFeed(0);
                                            }
                                            return !1
                                        }, 800)
                                    }, 300)
                                }
                            });
                        }, 300)
                    }
                });
            };
        },
    };


    var HowrseSupporterUtils = {
        RefreshRedEnergy: function(){
            if($('#walk-foret-form')){
                let horseEnergia = parseInt($('#energie').text());
                $('#walkforetSlider ol li').eq(1).click();
                setTimeout(function(){
                    let energia = 0;
                    $('#walkforetSlider ol li').each(function(index){
                        if(index != 0){
                            let firstEnergia = parseFloat($('#walk-foret-energie').text().substring(1));

                            if ($(this).hasClass("disabled") == false){
                                energia = energia + firstEnergia;
                                if ((horseEnergia - energia) <= 20){
                                    $(this).addClass("energ");
                                    $('#walkmontagneSlider ol li[data-number="'+index+'"]').addClass("energ");
                                    $('#walkplageSlider ol li[data-number="'+index+'"]').addClass("energ");
                                }
                            } else {
                                $('#walkforetSlider ol li').eq(0).click();
                                return !1
                            }
                        }
                    })
                }, 200)
            }
        },


        JustFeed: function(argum){
            execWhenReady(function(){
                var hay = $('.section-fourrage-target').text();
                var hay2 = $('.section-fourrage-quantity').text().split(" / ")[0];
                var oats = $('.section-avoine-target').text();
                var oats2 = $('.section-avoine-quantity').text().split(" / ")[0];

                let requiredhay = hay - hay2;
                let requiredoats = oats - oats2;

                if (argum == 1){$('#haySlider-sliderHidden').val(requiredhay);}
                $('#oatsSlider-sliderHidden').val(requiredoats);


                execWhenReady(function(){$('#feed-button').submit()});
                setTimeout(function(){
                    HowrseSupporterUtils.RefreshRedEnergy();
                }, 400)
            });
        },

        CatchUFO: function(){
            setTimeout(function(){
                console.log("test")
                if($("#Ufo_0")){
                    $("#Ufo_0").click();
                }
            }, 1000)
        },

        CheckIfActuallySubmitted: function(toCheckLast){
            if ($(toCheckLast).html() != undefined){
                setTimeout(function(){
                    $(toCheckLast).submit();
                    return true;
                }, 300)
            } else {
                return true;
            }
        },

        OpenConfigMenu: function(){
            GM_config.open();
        }
        // NOT USED FOR NOW
    }
 
 
 
 
 // START THE SCRIPT
    execWhenReady(function(){Start();});
    // START THE SCRIPT




    // ALL THE SCRIPT THINGS

    function Start(){
        GM_config.init({
                'id': 'MyConfig',
                'title': 'Ustawienia',
                'fields':
                {
                    'Name': // This is the id of the field
                    {
                        'label': 'Name', // Appears next to field
                        'type': 'text', // Makes this setting a text field
                        'default': 'Sizzle McTwizzle' // Default value if user doesn't change it
                    }
                }
        });


        $("<style>.slider-style-0 li.blue.energ::after, .slider-style-0 li.green.energ::after { background-image: url('https://i.imgur.com/aHxVybt.png'); }</style> ").appendTo("head");
        $("<style>.slider-style-1 li.blue.energ::after, .slider-style-0 li.green.energ::after { background-image: url('https://i.imgur.com/aHxVybt.png'); }</style> ").appendTo("head");
        $("<style>.table-customo {width:100%;}</style>").appendTo("head");
        $("<style>.table-customo tbody tr td {text-align:center;}</style>").appendTo("head");
        $("<style>.table-customo tbody tr td div {text-align:center; margin:5px;}</style>").appendTo("head");

        HowrseSupporterMain.addUtilities();
        HowrseSupporterUtils.RefreshRedEnergy();

        HowrseSupporterUtils.CatchUFO();

    };






