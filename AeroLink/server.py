import os
import socket
import time


def start_server():
    port = 2023
    s = socket.socket()
    # host = socket.gethostname()
    host = "192.168.2.102"
    print(host)
    s.bind((host, port))
    s.listen(5)

    print('Server listening....')

    while True:
        conn, addr = s.accept()
        print('Got connection from', addr)

        try:
            data = conn.recv(1024)
            print('Server received', repr(data))

            # Receive a message to indicate the start of download measurement
            conn.send("start_download".encode())

            # Send a file with dynamic size
            filename = 'download.txt'
            file_size = os.path.getsize(filename)

            with open(filename, 'rb') as f:
                conn.sendall(str(file_size).encode())  # Send the file size to the client
                ack = conn.recv(1024)  # Wait for client acknowledgment

                if ack.decode() == 'start_upload':
                    while True:
                        l = f.read(1024)
                        if not l:
                            break
                        conn.sendall(l)

            print('Done sending download')
            conn.recv(1024)  # Wait for the client confirmation

            # Receive a message to indicate the start of upload measurement
            conn.send("start_upload".encode())

            # Receive the file from the client
            uploaded_file_size = int(conn.recv(1024).decode())
            print(uploaded_file_size)
            conn.send("start_upload".encode())  # Send acknowledgment to start upload

            with open('uploaded_file.txt', 'wb') as f:
                received_size = 0
                while received_size < uploaded_file_size:
                    data = conn.recv(1024)
                    f.write(data)
                    received_size += len(data)

            print('Done receiving upload')

            conn.send('Upload complete. Thank you for connecting'.encode())
        except Exception as e:
            print('Error:', str(e))
        finally:
            conn.close()

if __name__ == "__main__":
    start_server()


