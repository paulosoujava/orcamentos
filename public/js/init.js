
(function ($) {
  $(function () {
    $('.sidenav').sidenav()

    /**********************************************************************************************
    /** CREATE OR UPDATE PJ PF */
    $('#createOrUpdateBtn').click(function (e) {
      const body = {}
      body.obs = $('#obs').val()
      let flagOk = true
      const requireFields = ['nome', 'email', 'cpfCnpj', 'telefone', 'cidade', 'uf', 'endereco']
      for (const field of requireFields) {
        if ($(`#${field}`).val() === '') {
          $(`#${field}`).focus()
          alert('Ops..',
            `Você deve preencher o campo ${field}`,
            'info')
          flagOk = false
          break
        }
        body[field] = $(`#${field}`).val()
      }
      if (flagOk) {
        // check if is updata
        let url = 'http://localhost:5001/api/create'
        let type = 'POST'
        const id = $('#idClient').val()
        if (id) {
          body.idGeneric = id
          url = 'http://localhost:5001/api/update'
          type = 'PUT'
        }
        console.log(body)
        $.ajax({
          url: url,
          type: type,
          dataType: 'json',
          data: body,
          success: function (data) {
            const icon = 'success'
            const title = 'Opaaa'
            alert(title, data.message, icon)
            if (!data.erro) {
              if (!id) {
                document.getElementById('obs').value = ''
                for (const field of requireFields) {
                  document.getElementById(field).value = ''
                }
              }
            } else {
              const icon = 'info'
              const title = 'Opss'
              alert(title, data.message, icon)
            }
          },
          error: function (data) {
            const icon = 'error'
            const title = 'Opss'
            alert(title, data.message, icon)
          }
        })
      }

      console.log(body)
      e.preventDefault()
    })
    /**********************************************************************************************/
  }) // end of document ready
})(jQuery) // end of jQuery name space

function goBack () {
  window.history.back()
}

function deleteClient (id) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success green btnDelete',
      cancelButton: 'btn btn-danger red'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Você tem certeza?',
    text: 'Você não poderá recurperar este dado após deletar!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, Pode deletar!',
    cancelButtonText: 'Não, cancele!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:5001/api/delete/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          document.location.reload(true)
        })
        .catch(error => {
          Swal.showValidationMessage(
          `Request failed: ${error}`
          )
        })
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'Os dados continuam salvos  :)',
        'error'
      )
    }
  })
}

function alert (title, msg, type) {
  Swal.fire(
    title,
    msg,
    type
  )
}
