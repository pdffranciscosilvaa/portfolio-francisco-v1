<?php
    // send_email.php

    // Inclua os arquivos do PHPMailer
    // Se você usou Composer:
    require 'vendor/autoload.php';
    // Se você baixou manualmente e colocou em 'phpmailer/src':
    // require 'phpmailer/src/PHPMailer.php';
    // require 'phpmailer/src/SMTP.php';
    // require 'phpmailer/src/Exception.php';

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    // Verifica se a requisição é POST
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Coleta e sanitiza os dados do formulário
        $name = htmlspecialchars(trim($_POST['name']));
        $email = htmlspecialchars(trim($_POST['email']));
        $phone = htmlspecialchars(trim($_POST['phone']));
        $message = htmlspecialchars(trim($_POST['message']));

        // Validação básica dos campos
        if (empty($name) || empty($email) || empty($message)) {
            echo "Por favor, preencha todos os campos obrigatórios (Nome, Email, Mensagem).";
            exit;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo "Por favor, insira um endereço de e-mail válido.";
            exit;
        }

        $mail = new PHPMailer(true); // Instancia um novo objeto PHPMailer, true para habilitar exceções

        try {
            // Configurações do Servidor SMTP (MUITO IMPORTANTE!)
            // Você precisará obter essas informações do seu provedor de e-mail (Gmail, Outlook, seu host, etc.)
            $mail->isSMTP();                                            // Enviar usando SMTP
            $mail->Host       = 'smtp.example.com';                     // Servidor SMTP (ex: smtp.gmail.com, smtp.office365.com)
            $mail->SMTPAuth   = true;                                   // Habilitar autenticação SMTP
            $mail->Username   = 'seu_email_smtp@example.com';           // Seu e-mail SMTP (o e-mail que enviará a mensagem)
            $mail->Password   = 'sua_senha_smtp';                       // Sua senha SMTP
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            // Habilitar criptografia TLS implícita (SMTPS)
            // Ou PHPMailer::ENCRYPTION_STARTTLS para TLS explícito (porta 587)
            $mail->Port       = 465;                                    // Porta TCP para conectar (465 para SMTPS, 587 para STARTTLS)
            $mail->CharSet    = 'UTF-8';                                // Define o charset para UTF-8
            $mail->Encoding   = 'base64';                               // Define a codificação

            // Remetente e Destinatário
            $mail->setFrom('seu_email_smtp@example.com', 'Seu Nome ou Nome do Site'); // O e-mail que enviará
            $mail->addAddress('seuemail@exemplo.com', 'Destinatário'); // *** SUBSTITUA PELO SEU ENDEREÇO DE E-MAIL REAL ***
            $mail->addReplyTo($email, $name); // Adiciona o e-mail do remetente do formulário como Reply-To

            // Conteúdo do E-mail
            $mail->isHTML(false);                                       // Definir formato do e-mail como texto simples (false para texto, true para HTML)
            $mail->Subject = "Novo contato do Portfólio: $name";
            
            $body = "Nome: $name\n";
            $body .= "Email: $email\n";
            if (!empty($phone)) {
                $body .= "Telefone: $phone\n";
            }
            $body .= "Mensagem:\n$message";
            $mail->Body    = $body;

            $mail->send();
            echo "Email enviado com sucesso! Entraremos em contato em breve.";
        } catch (Exception $e) {
            echo "Falha ao enviar o email. Erro do Mailer: {$mail->ErrorInfo}";
        }
    } else {
        echo "Método de requisição inválido.";
    }
    ?>
    