/*
-------MAGAZINE SECTION-------
*/
var dataItem = "";

function magMain() {
    //ZDataSource Tabella
    kendoExtension.ZDataSourceConfig.ServiceInit("http://94.141.27.206/MatteottiWeb/DataService");

    //Bottoni header
    $("#addStampa").kendoButton({
        imageUrl: "img/icons/add_circle.svg"
    });
    $("#delStampa").kendoButton({
        imageUrl: "img/icons/delete.svg"
    });
    $("#editStampa").kendoButton({
        imageUrl: "img/icons/edit.svg"
    });
    $("#setStampa").kendoButton({
        imageUrl: "img/icons/settings.svg"
    });
    $("#magTitlePrev").kendoButton({
        imageUrl: "img/icons/prev.svg",
        click: function(e) {issuePrev();}
    });
    $("#magTitleNext").kendoButton({
        imageUrl: "img/icons/next.svg",
        click: function(e) {issueNext();}
    });
    magTitleBarInit();

    //Griglia ADV
    var serviceUrlAdv = new kendoExtension.ZDataSource({
        resource: "ADVPubItems",
        fieldDef: "id_xatadvpubvoce:n, tipovoce, titolo, cd_cf, id_cfcontatto:n, valore:n, note, provvisoria:l, omaggio:l,opzionato:l,cd_xatadvwebuser,sequenza:n, id_xatadvpubnumero:n, numero:n, anno:n, data_numero:d, id_xatadvpubpos:n, ripetizione:n, posizione, cd_xatadvpubpp, periodoparticolare:n",                    
        keyCol: "id_xatadvpubvoce",
        pageSize: 1000000,
        extraData: function() {
            return {
            cd_xatadvpub: "MAGAZINE",
            data_inizio: getDataInizio((magNumbDS.data() [currentPosition]).anno),
            data_fine: getDataFine((magNumbDS.data() [currentPosition]).anno)
            };
        },
            filter: magAdvFilter()
    });

    $("#advGrid").kendoGrid({
        dataSource: serviceUrlAdv,
        columns: [
            { field: "cd_cf", title: "Cliente",
                template: function(dataItem) {
                    return getClient(dataItem.cd_cf);
                }
            },
            { field: "valore", title: "Valore" },
            { field: "id_xatadvpubpos", title: "Posizione",
                template: function(dataItem) {
                    return getPosition(dataItem.id_xatadvpubpos);
                }
            }
        ],
        selectable: true,
        change: function(e) {
            //Al clic della riga parte un log contenente l'oggetto selezionato
            var rows = e.sender.select();
            rows.each(function(e) {
                var grid = $("#advGrid").data("kendoGrid");
                dataItem = grid.dataItem(this);
                console.log(dataItem);
            })
        },
        editable: "popup",
        scrollable: false,
        dataBound: function(e) {
            //Calcolo del totale di ADV e Fatturato
            let totale = 0;
            let provola = this.dataSource.data();
            for (let index = 0; index < provola.length; index++) {
                const element = provola[index];
                totale = totale + element.valore;
            }
            $("#magTotAdv").text("€ " + totale.toString());
            $("#magNumAdv").text("Nr. " + provola.length.toString());
        }        
    });

    //Griglia END
    var serviceUrlEnd = new kendoExtension.ZDataSource({
        resource: "ADVPubItems",
        fieldDef: "id_xatadvpubvoce:n, tipovoce, titolo, cd_cf, id_cfcontatto:n, valore:n, note, provvisoria:l, omaggio:l,opzionato:l,cd_xatadvwebuser,sequenza:n, id_xatadvpubnumero:n, numero:n, anno:n, data_numero:d, id_xatadvpubpos:n, ripetizione:n, posizione, cd_xatadvpubpp, periodoparticolare:n",                    
        keyCol: "id_xatadvpubvoce",
        pageSize: 1000000,
        extraData: function() {
            return {
            cd_xatadvpub: "MAGAZINE",
            data_inizio: getDataInizio((magNumbDS.data() [currentPosition]).anno),
            data_fine: getDataFine((magNumbDS.data() [currentPosition]).anno)
            };
        },
            filter: magEndFilter()
    });

    $("#endGrid").kendoGrid({
        dataSource: serviceUrlEnd,
        columns: [
            { field: "titolo", title: "Contenuti" },
            { field: "valore", title: "Valore"},
            { field: "cd_xatadvwebuser", title: "Referente"}
        ],
        selectable: true,
        change: function(e) {
            //Al clic della riga parte un log contenente l'oggetto selezionato
            var rows = e.sender.select();
            rows.each(function(e) {
                var grid = $("#endGrid").data("kendoGrid");
                dataItem = grid.dataItem(this);
                console.log(dataItem);
            })
        },
        editable: "popup",
        scrollable: false,
        dataBound: function(e) {
            //Calcolo del totale di END e Fatturato
            let totale = 0;
            let provola = this.dataSource.data();
            for (let index = 0; index < provola.length; index++) {
                const element = provola[index];
                totale = totale + element.valore;
            }
            $("#magTotEnd").text("€ " + totale.toString());
            $("#magNumEnd").text("Nr. " + provola.length.toString());
        }        
    });
}

function magInit() {
    //ZDataSource Tabella
    kendoExtension.ZDataSourceConfig.ServiceInit("http://94.141.27.206/MatteottiWeb/DataService");
    clientListDS = new kendoExtension.ZDataSource({
        resource: "ADVcf",
        fieldDef: "cd_cf,descrizione,indirizzo,localita,provincia,nazione,partitaiva,codicefiscale",                    
        keyCol: "cd_cf",
        pageSize: 1000000,
        callRead: true,
        //syncCall: true
        change: function(e) {
            posListDS = new kendoExtension.ZDataSource({
                resource: "ADVPubCols",
                fieldDef: "replica:n, id_posizione:n, nome, sequenza:n",                    
                keyCol: "id_posizione",
                callRead: true,
                //syncCall: true,
                extraData: {
                    cd_xatadvpub: "MAGAZINE"
                },
                change: function(e) {
                    magNumbDS = new kendoExtension.ZDataSource({
                        resource: "ADVPubRows",
                        fieldDef: "progressivo:n, anno:n, data_uscita:d, nome, pubblcita:l, contenuto:l, giorno:n, settimana:n",   
                        keyCol: "progressivo",
                        callRead: true,
                        //syncCall: true,
                        sort: [
                            {
                                field: "anno",
                                dir: "asc"
                            },
                            {
                                field: "progressivo", 
                                dir: "asc"
                            }
                        ],
                        extraData: function(e) {
                            return {
                            cd_xatadvpub: "MAGAZINE",
                            data_inizio: "19000101", //getDataInizio(),
                            data_fine: "20790606" //getDataFine()
                            };
                        },
                        change: function(e) {
                            for (let index = 0; index < this.data().length; index++) {
                                const element = this.data()[index];
                                if( element.anno == (new Date()).getFullYear() ) {
                                    currentPosition = index;
                                    break;
                                }
                            } 
                            magMain();
                        }
                    });
                }
            });
        }
    });
}