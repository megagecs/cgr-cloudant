$("#btnBuscar").click(function () 
{

  dataIn = getData();
  sendData(dataIn);

});

function getData()
{
  let dataIn =
  {
      msgId: "99999990000000000000000000000000000000000000g3cs",
      fecMin:"01/01/18",
      fecMax:"02/01/18"
  };
  return dataIn;
}

function sendData(dataIn)
{

  $.ajax({
    type: "POST",
    url: "/api/bot",
    /*timeout: 120000,
    beforeSend: function (jqXHR, settings) {
    },*/
    data: dataIn,
    success: function (data) {
      console.log('data OK: ' + JSON.stringify(data));
    },
    error: function (jqXHR, textStatus, err) {
      console.log('error: ' + JSON.stringify(jqXHR));
    },
  });

}