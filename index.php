<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="thiago-mota">
    <meta name="csrf-token" id="csrf-token" content="thiago-mota-test-2023-07">

    <title>Document Management System - Test</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/4.0/examples/checkout/">

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">

    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

  </head>

  <body class="bg-light">

    <div class="container">
      <?php include "menu.php"; ?>

      <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Documents Created <small id="docsLoading"></small></span>
          </h4>
          <ul class="list-group mb-3" id="docsList"></ul>

        </div>

        <div class="col-md-8 order-md-1">
          <h4 class="mb-3">Create New Document</h4>
          <form class="needs-validation" novalidate>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="doc_name">*Name</label>
                <input type="text" class="form-control" id="doc_name" name="doc_name" placeholder="Give your Document a cool name" required>
                <div class="invalid-feedback">
                  Valid name is required.
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="doc_template">*Template</label>
                <input type="text" class="form-control" id="doc_template" name="doc_template" placeholder="Give your Document a cool template name" required>
                <div class="invalid-feedback">
                  Valid template is required.
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 mb-3">
                <label for="doc_resume">*Resume</label>
                <input type="text" class="form-control" id="doc_resume" name="doc_resume" placeholder="Give your Document a cool resume" required>
                <div class="invalid-feedback">
                  Valid resume is required.
                </div>
              </div>
            </div>

            <hr class="mb-4">

            <button class="btn btn-dark btn-block" type="button" id="btnCreateDoc">
              <i class="fa fa-check"></i> Create Now!
            </button>
          </form>
        </div>
      </div>

      <footer class="my-5 pt-5 text-muted text-center text-small">
        <p class="mb-1">Developed by Thiago Mota</p>
      </footer>
    </div>

    <script src="js/web-app.js"></script>
    <script src="js/scripts.js"></script>
    <script src="js/jquery-3.6.1.min.js"></script>

    <!-- JS PDF Lib -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.debug.js"></script>

    <script>
      $( document ).ready(function() {
          getDocs();
      });

      (function() {
        'use strict';

        window.addEventListener('load', function() {
          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          var forms = document.getElementsByClassName('needs-validation');
          var btn = $("#btnCreateDoc");

          // Loop over them and prevent submission
          var validation = Array.prototype.filter.call(forms, function(btn) {
            btn.addEventListener('click', function(event) {
              if (btn.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              } else {
                newDoc();
              }
              btn.classList.add('was-validated');
            }, false);
          });
        }, false);
      })();
    </script>
  </body>
</html>
