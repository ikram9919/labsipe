$(document).ready(function () {



    function bindRole(role) {
        if (role === "RESEARCHER") return "Chercheur";
        if (role === "CED_HEAD") return "Chef de CED";
        if (role === "TEAM_HEAD") return "Chef d'équipe";
        if (role === "VICE_CED_HEAD") return "Vice Président Chargé de la Recherche Scientifique";
    }

    function convertRoles(roles) {
        return roles.map(function (role) { return bindRole(role); });
    }
    /////////////////////////////////////////////////
    //instance d'authentification 
    const backendApiNoAuth = axios.create({
        baseURL: "https://rs-app-backendd.herokuapp.com/auth",
        timeout: 80000,
        headers: { "Content-Type": "application/json" },
    });

    //s'authentifier avec le Chef Labo LTI à changer (hejjaji pour labsip)
    backendApiNoAuth.post(`/login`, { email: 'Abdelowahed.hajjaji@gmail.com', password: 'Abdelowahed.hajjaji' })
        .then(function (response) {
            const user = response.data
            localStorage.setItem("user", JSON.stringify(response.data))

            //instance de l'api apres l'authentification
            const backendApi = axios.create({
                baseURL: "https://rs-app-backendd.herokuapp.com/api",
                timeout: 80000,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + user.token,
                },
            });

            //recuperation des utilisateurs du laboratoire


            backendApi.get(`/followed-users`, { params: { "laboratory_abbreviation": user.laboratoriesHeaded[0].abbreviation } })
                .then(function (response) {
                    var chercheurs = $('#chercheursInfo');
                    var op = "";

                    response.data.forEach((user)=>{
                        if(user.lastName=="HAJJAJI" ){
                            user.roles= convertRoles(user.roles)

                            if (user.profilePicture instanceof Object && user.profilePicture.data != undefined ) {

                                op += '<div class="member" data-aos="fade-up" >' +
                                '<div class="member-img">' +
                                `<img class="img-fluid" src="data:${user.profilePicture.mimetype};base64,${btoa(new Uint8Array(user.profilePicture.data.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}" style=" width:100%; height:350px !important;"  alt="">` +
                               '<div class="social" >' +
                                    '<a href=""><i class="icofont-twitter"></i></a>' +
                                    '<a href=""><i class="icofont-facebook"></i></a>' +
                                    '<a href=""><i class="icofont-instagram"></i></a>' +
                                    '<a href=""> <i class="icofont-linkedin"></i></a>' +
                                    '</div>' +
                                    '</div>'+
                                    '<div class="member-info" >' +
                                    `<h4 > ${user.firstName} ${user.lastName}</h4>` +
                                    `<span>Directeur de LABSIPE</span>` +
                                    
                                    
                                    '</div>' +
                                    '</div>'
                            } else {
                                op += '<div class="member" data-aos="fade-up" >' +
                                '<div class="member-img">' +
                                `<img class="img-fluid" src="https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName} "  alt="">` +
                                
                                '<div class="social" >' +
                                '<a href=""><i class="icofont-twitter"></i></a>' +
                                '<a href=""><i class="icofont-facebook"></i></a>' +
                                '<a href=""><i class="icofont-instagram"></i></a>' +
                                '<a href=""> <i class="icofont-linkedin"></i></a>' +
                                '</div>' +
                                '</div>'+
                                '<div class="member-info" >' +
                                `<h4 > ${user.firstName} ${user.lastName}</h4>` +
                                `<span>Directeur de LABSIPE</span>` +
                                
                                
                                '</div>' +
                                '</div>' 
                            }
                        }
                    })

                    response.data.forEach((user) => {
                        user.roles = convertRoles(user.roles);
                        if (user.lastName != "HAJJAJI" && user.lastName != "EL BALLOUTI" && user.lastName != "TOUHTOUH" && user.lastName != "KANDOUSSI" && user.lastName != "ACHAK" && user.lastName != "EL BEID" && user.lastName != "KADDAR") {
                            if (user.profilePicture instanceof Object && user.profilePicture.data != undefined ) {
                                if (user.roles.includes("CED_HEAD")) return ["chef de CED"];
                                op += '<div class="member" data-aos="fade-up" >' +
                                '<div class="member-img">' +
                                `<img class="img-fluid" src="data:${user.profilePicture.mimetype};base64,${btoa(new Uint8Array(user.profilePicture.data.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}" style=" width:100%; height:350px !important;"  alt="">` +
                               '<div class="social" >' +
                                    '<a href=""><i class="icofont-twitter"></i></a>' +
                                    '<a href=""><i class="icofont-facebook"></i></a>' +
                                    '<a href=""><i class="icofont-instagram"></i></a>' +
                                    '<a href=""> <i class="icofont-linkedin"></i></a>' +
                                    '</div>' +
                                    '</div>'+
                                    '<div class="member-info" >' +
                                    `<h4 > ${user.firstName} ${user.lastName}</h4>` +
                                    `<span>${user.roles}</span>` +
                                    
                                    
                                    '</div>' +
                                    '</div>'

                            } else {
                                op += '<div class="member" data-aos="fade-up" >' +
                                '<div class="member-img">' +
                                `<img class="img-fluid" src="https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName} "  alt="">` +
                                
                                '<div class="social" >' +
                                '<a href=""><i class="icofont-twitter"></i></a>' +
                                '<a href=""><i class="icofont-facebook"></i></a>' +
                                '<a href=""><i class="icofont-instagram"></i></a>' +
                                '<a href=""> <i class="icofont-linkedin"></i></a>' +
                                '</div>' +
                                '</div>'+
                                '<div class="member-info" >' +
                                `<h4 > ${user.firstName} ${user.lastName}</h4>` +
                                `<span>${user.roles}</span>` +
                                
                                
                                '</div>' +
                                '</div>'
                            }
                            
                        }
                        else if (user.lastName != "HAJJAJI" && user.lastName == "EL BALLOUTI" || user.lastName == "TOUHTOUH" || user.lastName == "KANDOUSSI" || user.lastName == "ACHAK" ||  user.lastName == "EL BEID" || user.lastName == "KADDAR" ){
                            if (user.profilePicture instanceof Object && user.profilePicture.data != undefined ) {

                                op +=  '<div class="member" data-aos="fade-up" >' +
                                '<div class="member-img">' +
                                `<img class="img-fluid" src="data:${user.profilePicture.mimetype};base64,${btoa(new Uint8Array(user.profilePicture.data.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}" style=" width:100%; height:350px !important;"  alt="">` +
                               '<div class="social" >' +
                                    '<a href=""><i class="icofont-twitter"></i></a>' +
                                    '<a href=""><i class="icofont-facebook"></i></a>' +
                                    '<a href=""><i class="icofont-instagram"></i></a>' +
                                    '<a href=""> <i class="icofont-linkedin"></i></a>' +
                                    '</div>' +
                                    '</div>'+
                                    '<div class="member-info" >' +
                                    `<h4 > ${user.firstName} ${user.lastName}</h4>` +
                                    `<span>Chef d'équipe</span>` +
                                    
                                    
                                    '</div>' +
                                    '</div>'

                            }
                            else{
                                op += '<div class="member" data-aos="fade-up" >' +
                                '<div class="member-img">' +
                                `<img class="img-fluid" src="https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName} "  alt="">` +
                                
                                '<div class="social" >' +
                                '<a href=""><i class="icofont-twitter"></i></a>' +
                                '<a href=""><i class="icofont-facebook"></i></a>' +
                                '<a href=""><i class="icofont-instagram"></i></a>' +
                                '<a href=""> <i class="icofont-linkedin"></i></a>' +
                                '</div>' +
                                '</div>'+
                                '<div class="member-info" >' +
                                `<h4 > ${user.firstName} ${user.lastName}</h4>` +
                                `<span>Chef d'équipe}</span>` +
                                
                                
                                '</div>' +
                                '</div>' 
                            }
                            }
                    })
                    chercheurs.trigger('destroy.owl.carousel'); 
                    chercheurs.find('.owl-stage-outer').children().unwrap();
                    chercheurs.removeClass("owl-center owl-loaded owl-text-select-on");
                chercheurs.html(op)

                chercheurs.owlCarousel({
                    items: 3,
                    loop: true,
                    margin: 50,
                    autoplay: true,
                    autoplayTimeout: 3000,
                    autoplayHoverPause: true,
                  
                });

               

            }).catch(function (error) {
                console.log(error)
            })


            //doctorants
            backendApi.get(`/phdStudentsLabs`)
            .then(function (response) {
                console.log(response);
                var content = '';
                
                response.data.students.forEach((phdStudent) => {
                    console.log(phdStudent)
                    var coSupervisor ;
                    if(phdStudent.coSupervisor==null){
                        coSupervisor="none"
                    }else{
                        coSupervisor=phdStudent.coSupervisor.firstName.concat(" "+phdStudent.coSupervisor.lastName)
                    }
                    content +='<div class="testimonial-item">' +
                             `<p></p>`+
                        `<img class="testimonial-img" src="https://ui-avatars.com/api/?name=${phdStudent.firstName}+${phdStudent.lastName}"  alt="">` +
                        
                        `<h3>${phdStudent.firstName} ${phdStudent.lastName}</h3>` +
                         
                        `<h4><strong>Directeur de thèse :</strong>${phdStudent.supervisor.firstName.concat(" "+phdStudent.supervisor.lastName)}</h4>` +
                        `<h4><strong>Co-Directeur de thèse : </strong> ${coSupervisor}</h4>` +
                        `<h4><strong>Intitulé de la thèse : </strong> ${phdStudent.thesisTitle}</h4>` +
                       
                        '</div>'  
                      
                })
                var carousel = $('#phdStudentsInfo');
                carousel.trigger('destroy.owl.carousel'); 
                carousel.find('.owl-stage-outer').children().unwrap();
                carousel.removeClass("owl-center owl-loaded owl-text-select-on");
                var phdStudentsCount = $('#phdStudentsCount');
                var nbrr = ""+response.data.length;
                phdStudentsCount.html(nbrr);
               
                carousel.html(content);

                //reinitialize the carousel (call here your method in which you've set specific carousel properties)
                carousel.owlCarousel({
                    items: 2,
                    loop: true,
                    margin: 5,
                    autoplay: true,
                    autoplayTimeout: 3000,
                    autoplayHoverPause: true
                });
            })
            .catch(function (error) {
                console.log(error)
            })


            



         //publications
         backendApi.get('/followed-users', { params: { "laboratory_abbreviation": "LABSIPE" } })
         .then(function (response) {

             var pubs = new Map()
             response.data.forEach((data) => {
                 data.publications.forEach((pub) => {
                     pubs.set(pub.title.toLowerCase(), pub)
                 })
             })
             pubs = Array.from(pubs).map((pub) => { return pub[1] })

             var pubData = new Map();
             pubs.forEach((pub) => {
                 var temp = new Array();
                 temp.push(pub)
                 if (pubData.get(pub.year)) {
                     pubData.set(pub.year, pubData.get(pub.year).concat(temp))
                 } else {
                     pubData.set(pub.year, temp)
                 }
             })

             var keys = pubData.keys();
             var mainOp='';
             var i =1;
             Array.from(keys).sort().reverse().forEach((key) => {
                 var pubs = pubData.get(key);
                 var op = `<li> <a data-toggle="collapse" href="#faq${i}" class="collapsed">${key}<i class="icofont-simple-up"></i></a><div id="faq${i}" class="collapse" data-parent=".faq-list">`;
                 pubs.forEach((publications) => {

                     if ((publications.source != null || publications.source != undefined)) {
                         
                     op += `<p> ${publications.authors.join(', ')}, "${publications.title}"
                     , ${publications.source}.
                 </p>`
                     }else {
                  
                  op += `<p> ${publications.authors.join(', ')}, "${publications.title}".</p>`}
                     
                          
                 })
                 op += '</div>'+
                 
             '</li>'
             mainOp+=op;
             i=i+1;
             })

             $("#pubs").html(mainOp)

         })
         .catch(function (error) {
             console.log(error)
         })


          // count teams
          backendApi.get(`/followed-users/`, { params: { "laboratory_abbreviation": "LABSIPE"  } })
          .then(function (response) {
          console.log(response);
          var teamsCount = $('#usersCount');
              var nbr = ""+response.data.length;
              teamsCount.html(nbr);

           
         
          }).catch(function (error) {
              console.log(error)
          })

          backendApi.get()
          .then(function (response) {
          console.log(response);
          var teamsCount = $('#pubsCount');
              var nbr = ""+response.data.length;
              teamsCount.html(nbr);

           
         
          }).catch(function (error) {
              console.log(error)
          })

          backendApi.get('/teams/', { params: { "laboratory_abbreviation": "LABSIPE" } })
          .then(function (response) {
          console.log(response);
          var teamsCount = $('#teamsCount');
              var nbr = ""+response.data.length;
              teamsCount.html(nbr-3);

           
         
          }).catch(function (error) {
              console.log(error)
          })


          backendApi.get('/phdStudents/',{ params: { "laboratory_id": "5f40f53095de870017abef57" } })
                .then(function (response) {
                console.log(response);
                var phdStudentsCount = $('#phdStudentsCount');
                    var nbr = ""+response.data.length;
                    phdStudentsCount.html(nbr-11);

                 
               
                }).catch(function (error) {
                    console.log(error)
                })


       
    
    })
    })